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
import { getNascaFixtures, getNascaFixturesLive, getNascaMatchFixtures, nascaFixtureStatusState } from '../../redux/slices/NascaSlice'
import { LoadingState } from '../../components/LoadingState'
import NascarCard from '../../components/GameCard/NascarCard'
import { MdCancel } from "react-icons/md";


function Nascar() {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [schedule, setSchedule] = useState<any>([])
  const loading = useAppSelector(nascaFixtureStatusState) as any
  const dispatch = useAppDispatch() as any
  const [selectedStatus, setSelectedStatus] = useState('Live')
  const [calendarDate, setCalendarDate] = useState<{ index: string; formattedDate: string } | null>(null);
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

    socket.on("nascarUpdates", (message) => {
      const mes = message;
      setLive(mes)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const payloadLive = {
      range: 'live'
    }
    const payloadUpcoming = {
      range: calendarDate?.index
    }

    dispatch(getNascaFixturesLive()).then((dd) => {
      console.log({ dd })
      // const tp = dd?.payload?.tournaments?.map(rr => {
      //   return {
      //     ...rr,
      //     race: Array.isArray(rr?.race) ? rr?.race : [rr?.race]
      //   }
      // })
      const bb = [dd?.payload?.tournaments]
      console.log({ bb })
      setLive(bb || []);
    });

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getNascaMatchFixtures(payloadUpcoming)).then((dd) => {
        const tp = dd?.payload?.category?.map(rr => {
          return {
            ...rr,
            race: Array.isArray(rr?.race) ? rr?.race : [rr?.race]
          }
        })
        setUpcoming(tp || []);
      });
    }

  }, [dispatch, calendarDate])


  useEffect(() => {
    const payloadFinished = {
      range: 'upcoming'
    }


    dispatch(getNascaMatchFixtures(payloadFinished)).then((dd) => {
      console.log("sch", dd)
      const tp = dd?.payload?.category?.map(rr => {
        return {
          ...rr,
          race: Array.isArray(rr?.race) ? rr?.race : [rr?.race]
        }
      })
      setSchedule(tp || []);
    });
  }, [])


  const liveMatches = Array.isArray(live) && (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    race: league?.race?.filter(match => match.status === "In progress" || match.status === "Set 1" || match.status === "Set 2" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.race?.length > 0);

  // const liveMatches = live?.race?.filter(dd => dd?.status === "In Progress").map(aa => {
  //   return {
  //     name: live?.name,
  //     ...aa
  //   }
  // })

  // const upcomingMatches = live?.race?.filter(dd => dd?.status === "Not Started").map(aa => {
  //   return {
  //     name: live?.name,
  //     ...aa
  //   }
  // })

  // const finishedMatches = live?.race?.filter(dd => dd?.status === "Finished").map(aa => {
  //   return {
  //     name: live?.name,
  //     ...aa
  //   }
  // })

  // const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
  //   ...league,
  //   races: league?.races.filter(match => match.status === "Not Started")
  // }))
  //   .filter(league => league?.races.length > 0);


  const finishedMatches = Array.isArray(live) && (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    race: league?.race?.filter(match => match.status === "Cancelled" || match.status === "Finished")
  }))
    .filter(league => league?.race?.length > 0);



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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Nascar</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
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
            {liveMatches?.map((item, i) => {
              return <div key={i}>
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
                  {/* {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <NascarCard id={i} data={payload} />
                      </div>
                    )
                  })} */}
                  <div key={i}>
                    <NascarCard id={i} data={item} />
                  </div>
                </div>
              </div>

            })}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {Array.isArray(schedule) && schedule?.map((item, i) => {

              return <div key={i}>
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
                  {item?.race?.map((aa, index) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={index}>
                        <NascarCard id={index} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>

            })}

            {schedule?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => {
              return <div key={i}>
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
                  {/* {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <NascarCard id={i} data={payload} />
                      </div>
                    )
                  })} */}
                  <div key={i}>
                    <NascarCard id={i} data={item} />
                  </div>
                </div>
              </div>

            })}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        )
          : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {upcoming?.map((item, i) => {
              return <div key={i}>
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
                  {item?.race?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <NascarCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>

            })}
            {upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        )
          : null}

      </LoadingState>
    </div>
  )
}

export default Nascar
