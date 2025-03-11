import { useEffect, useState } from 'react'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { useNavigate } from 'react-router-dom'
import GameCard from '../../components/GameCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getFootballFixtures,
  footballFixtureStatusState
} from '../../redux/slices/FootballSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";
import { SportSportBaseUrl } from '../../https'



function Football({ calendarDate, setCalendarDate }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() as any
  const [live, setLive] = useState<any>([])
  // const loading = useAppSelector(footballFixtureStatusState) as any
  const [loading, setLoading] = useState(false)
  const [upcoming, setUpcoming] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const [finished, setFinished] = useState<any>([])

  const [selectedStatus, setSelectedStatus] = useState('Live')


  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("soccerUpdates", (message) => {
      const mes = message;
      setLive(mes)
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    const payloadTomorrow = {
      range: calendarDate?.index
    }
    setLoading(true)
    dispatch(getFootballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category)
      setLoading(false)
    })

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload || [])
      })
    }


  }, [])

  useEffect(() => {
    const payloadTomorrow = {
      range: calendarDate?.index
    }
    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {
        // console.log(">>", payloadTomorrow, { dd })
        setTomorrow(dd?.payload || [])
      })
    }


  }, [calendarDate])

  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    matches: league.matches.filter(match => match.status > 0 || match.status === "HT")
  }))
    .filter(league => league.matches.length > 0);

  const isTimeFormat = (str) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(str);

  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    matches: league.matches.filter(match => isTimeFormat(match?.status))
  }))
    .filter(league => league.matches.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    matches: league.matches.filter(match => match.status === "FT")
  }))
    .filter(league => league.matches.length > 0);




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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Soccer</p>
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
            {liveMatches?.map((item, i) => {

              return (
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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((item, i) => {

              return (
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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => {

              return (
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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {Array.isArray(tomorrow) && tomorrow?.map((item, i) => (
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
                  {item?.league}
                </p>
                <div>
                  {item?.matches?.map((aa, i) => {
                    const payload = {
                      league: item?.league,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {Array.isArray(tomorrow) && tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Football
