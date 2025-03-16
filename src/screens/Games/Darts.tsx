import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import { getDartFixtures } from '../../redux/slices/DartSlice'
import DartGameCard from '../../components/GameCard/DartGameCard'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";
import { LoadingState } from '../../components/LoadingState'

function Darts({ calendarDate, setCalendarDate }) {
  const navigate = useNavigate()

  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const [loading, setLoading] = useState(false)
  const [live, setLive] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("dartsUpdates", (message) => {
      const mes = message;
      console.log({ mes })
      console.log("mess", mes)
      setLive(mes?.category)
    });

    return () => {
      socket.disconnect();
    };
  }, []);



  useEffect(() => {

    setLoading(true)
    dispatch(getDartFixtures(null)).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.category || [])
      setLoading(false)
    })


  }, [])


  useEffect(() => {

    const payloadTomorrow = {
      range: calendarDate?.index
    }



    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getDartFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload?.category || [])
        setLoading(false)
      })
    }
  }, [calendarDate])
  console.log({ live })
  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match?.filter(match => /\d/.test(match.status))
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => {
      const matchDate = match?.date;
      const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
      return matchDate === today && match.status === "Not Started";
    })
  }))
    .filter(league => league?.match.length > 0);



  const finishedMatches = Array.isArray(live) && live?.map(league => ({
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Dart</p>
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
                        <DartGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Dart' height='30vh' />
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
                        <DartGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Dart' height='30vh' />
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
                        <DartGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Dart' height='30vh' />
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
                        <DartGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Dart' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Darts
