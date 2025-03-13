import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  boxingFixtureStatusState,
  getBoxingFixtures
} from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import BoxingGameCard from '../../components/GameCard/BoxingGameCard'
import { LoadingState } from '../../components/LoadingState'
import { MdCancel } from "react-icons/md";



function Boxing({ calendarDate, setCalendarDate }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  // const loading = useAppSelector(boxingFixtureStatusState) as any
  const dispatch = useAppDispatch() as any
  const [loading, setLoading] = useState(false)
  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("boxingUpdates", (message) => {
      const mes = message;

      setLive(mes)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const payloadUpcoming = {
      range: calendarDate?.index
    }

    setLoading(true)
    dispatch(getBoxingFixtures(null)).then((dd) => {
      console.log("", { dd })
      setLive(dd?.payload?.category || [])
      setLoading(false)
    })

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getBoxingFixtures(payloadUpcoming)).then((dd) => {
        setUpcoming(dd?.payload?.scores?.categories || [])
      })
    }

    // dispatch(getBoxingFixtures(payloadFinished)).then((dd) => {
    //   console.log({ dd })
    //   setFinished(dd?.payload?.scores?.categories || [])
    // })
  }, [calendarDate])




  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Set 1" || match.status === "Set 2" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Final" || match.status === "Finished")
  }))
    .filter(league => league?.match.length > 0);

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

  const oldStatus = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Scheduled'
    },
    {
      id: 3,
      name: 'Finished'
    }
  ]

  const secondStatus = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Scheduled'
    },
    {
      id: 3,
      name: 'Finished'
    },
    {
      id: 4,
      name: calendarDate?.formattedDate
    }
  ]

  const status = calendarDate ? secondStatus : oldStatus


  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Boxing</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          {status?.map((aa, i) => {
            return (
              <div key={i} style={{ position: 'relative' }}>
                {calendarDate && aa?.name === calendarDate?.formattedDate && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -25,
                      right: 0,
                      cursor: 'pointer',
                      fontSize: 12,
                      color: 'red'
                    }}
                    onClick={() => {
                      setCalendarDate(null)
                      setSelectedStatus("Live")
                    }}
                  >
                    <MdCancel size={25} />
                  </span>
                )}
                <p
                  onClick={() => setSelectedStatus(aa?.name)}
                  style={{
                    width: 80,
                    padding: 3,
                    cursor: 'pointer',
                    backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'gray',
                    color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                    marginRight: 4,
                    textAlign: 'center',
                    fontSize: 12
                  }}
                >
                  {aa?.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <LoadingState isLoading={loading}>
        {selectedStatus === 'Live' ? (
          <>
            {liveMatches?.map(
              (item, i) => (
                <div key={i}>
                  <p
                    style={{
                      ...FONTS.body7,
                      backgroundColor: COLORS.lightRed,
                      padding: 5,
                      marginBottom: 10,
                      borderRadius: 5,
                      color: COLORS.black,
                      marginRight: 10
                    }}
                  >
                    {item?.name}
                  </p>
                  <div>
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.name,
                        leagueId: item?.id,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map(
              (item, i) => (
                <div key={i}>
                  <p
                    style={{
                      ...FONTS.body7,
                      backgroundColor: COLORS.lightRed,
                      padding: 5,
                      marginBottom: 10,
                      borderRadius: 5,
                      color: COLORS.black,
                      marginRight: 10
                    }}
                  >
                    {item?.name}
                  </p>
                  <div>
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.name,
                        leagueId: item?.id,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map(
              (item, i) => (
                <div key={i}>
                  <p
                    style={{
                      ...FONTS.body7,
                      backgroundColor: COLORS.lightRed,
                      padding: 5,
                      marginBottom: 10,
                      borderRadius: 5,
                      color: COLORS.black,
                      marginRight: 10
                    }}
                  >
                    {item?.name}
                  </p>
                  <div>
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.name,
                        leagueId: item?.id,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {upcoming?.map(
              (item, i) => (
                <div key={i}>
                  <p
                    style={{
                      ...FONTS.body7,
                      backgroundColor: COLORS.lightRed,
                      padding: 5,
                      marginBottom: 10,
                      borderRadius: 5,
                      color: COLORS.black,
                      marginRight: 10
                    }}
                  >
                    {item?.name}
                  </p>
                  <div>
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.name,
                        leagueId: item?.id,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Boxing
