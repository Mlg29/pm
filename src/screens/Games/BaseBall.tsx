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
import HeaderBox from '../HeaderBox'

function Baseball() {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('Finished')
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
    setLoading(true)
    dispatch(getBaseballFixtures(null)).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.category || [])
      setLoading(false)
    })
    // dispatch(getBaseballFixtures(payloadUpcoming)).then((dd) => {
    //   setUpcoming(dd?.payload?.categories || [])
    // })
    // dispatch(getBaseballFixtures(payloadFinished)).then((dd) => {
    //   console.log({ dd })
    //   setFinished(dd?.payload?.categories || [])
    // })

  }, [dispatch])


  useEffect(() => {

    const payloadTomorrow = {
      range: calendarDate?.index
    }

    if (calendarDate) {
      setLoading(true)
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getBaseballFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload || [])
        setLoading(false)
      })
    }
  }, [calendarDate])



  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match?.status === "In progress")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match?.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
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
        <HeaderBox status={status} selectedStatus={selectedStatus} setTomorrow={setTomorrow} calendarDate={calendarDate} setCalendarDate={setCalendarDate} setSelectedStatus={setSelectedStatus} />
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
