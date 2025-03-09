import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import {
  getBaseballFixtures,
  BaseballFixtureeStatusState
} from '../../redux/slices/BaseballSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'
import BaseballGameCard from '../../components/GameCard/BaseballGameCard'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";
import { SportSportBaseUrl } from '../../https'

function Baseball({ calendarDate, setCalendarDate }) {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const loading = useAppSelector(BaseballFixtureeStatusState) as any
  const [selectedStatus, setSelectedStatus] = useState('Finished')

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

    socket.on("baseballUpdates", (message) => {
      const mes = message;
      setLive(mes)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {

    const payloadFinished = {
      range: 'finished'
    }
    const payloadTomorrow = {
      range: calendarDate?.index
    }
    dispatch(getBaseballFixtures(null)).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.category || [])
    })
    // dispatch(getBaseballFixtures(payloadUpcoming)).then((dd) => {
    //   setUpcoming(dd?.payload?.categories || [])
    // })
    // dispatch(getBaseballFixtures(payloadFinished)).then((dd) => {
    //   console.log({ dd })
    //   setFinished(dd?.payload?.categories || [])
    // })
    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getBaseballFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload || [])
      })
    }
  }, [dispatch, calendarDate])



  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match?.status === "In progress")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match?.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match?.status === "Cancelled" || match?.status === "Finished")
  }))
    .filter(league => league?.match.length > 0);



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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Baseball</p>
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
            {liveMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
                  }}
                >
                  {item?.['@name']}
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p
                  style={{
                    ...FONTS.body6,
                    color: COLORS.gray,
                    margin: '15px 0px'
                  }}
                ></p>
              </div>
            )}

            {upcomingMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {tomorrow?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Baseball
