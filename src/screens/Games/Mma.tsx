import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import {
  getMmaFixtures,
  mmaFixtureStatusState
} from '../../redux/slices/MmaSlice'
import MmaGameCard from '../../components/GameCard/MmaGameCard'
import { LoadingState } from '../../components/LoadingState'
import { MdCancel } from "react-icons/md";


function Mma() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [schedule, setSchedule] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const dispatch = useAppDispatch() as any
  // const loading = useAppSelector(mmaFixtureStatusState) as any
  const [loading, setLoading] = useState(false)
  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')
  const [calendarDate, setCalendarDate] = useState<{ index: string; formattedDate: string } | null>(null);

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("mmaUpdates", (message) => {
      const mes = message;
      console.log("mess>>", mes)
      setLive(mes?.category)
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
    dispatch(getMmaFixtures(null)).then((dd) => {
      console.log(">>>>", { dd })
      setLive(dd?.payload?.category || [])
      setLoading(false)
    })

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getMmaFixtures(payloadUpcoming)).then((dd) => {
        setUpcoming(dd?.payload?.match || dd?.payload || [])
      })
    }


  }, [calendarDate])

  useEffect(() => {
    const payloadFinished = {
      range: 'upcoming'
    }

    dispatch(getMmaFixtures(payloadFinished)).then((dd) => {
      setSchedule(dd?.payload || [])
    })
  }, [])


  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Live" || match.status === "In Progress" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = (Array.isArray(schedule) ? schedule : [schedule]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => {
      const matchDate = match?.date;
      const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
      return matchDate === today;
    })
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => {
      const matchDate = match?.date;
      const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
      return matchDate === today && (match.status === "Cancelled" || match.status === "Final" || match.status === "Finished");
    })

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
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>MMA</p>
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
                    padding: "5px 3px",
                    cursor: 'pointer',
                    backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'white',
                    color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                    marginRight: 4,
                    textAlign: 'center',
                    fontSize: 12,
                    border: "1px solid #2D0D02",
                    borderRadius: 3
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
            {liveMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {Array.isArray(upcomingMatches) && upcomingMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}
            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league?.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}

          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {upcoming?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league?.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}

            {upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}

          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Mma
