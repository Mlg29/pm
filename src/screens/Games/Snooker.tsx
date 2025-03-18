import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import { getSnookerFixtures } from '../../redux/slices/SnookerSlice'
import SnookerGameCard from '../../components/GameCard/SnookerGameCard'
import { MdCancel } from "react-icons/md";
import { LoadingState } from '../../components/LoadingState'



function Snooker() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [live, setLive] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const dispatch = useAppDispatch() as any
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

    socket.on("snookerUpdates", (message) => {
      const mes = message;
      console.log("mess", mes)
      setLive(mes?.category)
    });

    return () => {
      socket.disconnect();
    };
  }, []);




  useEffect(() => {

    setLoading(true)
    dispatch(getSnookerFixtures(null)).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.category?.category)
      setLoading(false)
    })


  }, [])


  useEffect(() => {

    const payloadTomorrow = {
      range: calendarDate?.index
    }



    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getSnookerFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload?.category)
        setLoading(false)
      })
    }
  }, [calendarDate])

  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")
    .map(league => ({
      ...league,
      match: Array.isArray(league?.match)
        ? league.match.filter(match => match?.status?.toLowerCase().includes("frame"))
        : []
    }))
    .filter(league => league.match.length > 0)


  const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => {
      const matchDate = match?.date;
      const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
      return matchDate === today && match.status === "Not Started";
    })
  }))
    .filter(league => league?.match.length > 0);



  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Interrupted" || match.status === "Finished")
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Snooker</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
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
              <div key={league?.name}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Snooker' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {Array.isArray(upcomingMatches) && upcomingMatches?.map((league, index) => {
              return <div key={league?.name}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Snooker' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((league, index) => (
              <div key={league?.name}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Snooker' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {tomorrow?.map((league, index) => (
              <div key={league?.name}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Snooker' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Snooker
