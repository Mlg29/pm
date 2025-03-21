import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import TennisGameCard from '../../components/GameCard/TennisGameCard'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getTennisFixtures,
  tennisFixtureStatusState
} from '../../redux/slices/TennisSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";
import HeaderBox from '../HeaderBox'


function Tennis() {
  const [live, setLive] = useState<any>([])
  // const loading = useAppSelector(tennisFixtureStatusState) as any
  const [loading, setLoading] = useState(false)
  const [Finished, setFinished] = useState<any>([])
  const [scheduled, setScheduled] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const dispatch = useAppDispatch() as any
  let createdDate = moment(new Date()).utc().format()
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

    socket.on("tennisUpdates", (message) => {
      const mes = message;
      setLive(mes?.category)
    });

    return () => {
      socket.disconnect();
    };
  }, []);



  useEffect(() => {
    const PayloadFinished = {
      range: 'finished'
    }
    const PayloadScheduled = {
      range: 'upcoming'
    }


    // dispatch(getTennisFixtures(PayloadFinished)).then((dd) => {
    //   setFinished(dd?.payload?.category || [])
    // })

    setLoading(true)
    dispatch(getTennisFixtures(null)).then((dd) => {
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
      setLoading(true)
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getTennisFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload?.category || [])
        setLoading(false)
      })
    }
  }, [calendarDate])



  useEffect(() => {
    const PayloadScheduled = {
      range: 'upcoming'
    }
    dispatch(getTennisFixtures(PayloadScheduled)).then((dd) => {
      setScheduled(dd?.payload?.category || [])
    })
  }, [])



  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match?.filter(match => match?.status?.toLowerCase().includes("set"))
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = (Array.isArray(scheduled) ? scheduled : [scheduled]).filter(league => league && typeof league === "object")?.map(league => ({
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
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Interrupted" || match.status === "Finished" || match.status === "Retired")
  }))
    .filter(league => league?.match.length > 0);




  const [selectedStatus, setSelectedStatus] = useState('Live')

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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Tennis</p>
        <HeaderBox status={status} selectedStatus={selectedStatus} setTomorrow={setTomorrow} calendarDate={calendarDate} setCalendarDate={setCalendarDate} setSelectedStatus={setSelectedStatus} />
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
                  {league?.name}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      leagueId: league.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Tennis' height='30vh' />
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
                  {league?.name}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Tennis' height='30vh' />
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
                  {league?.name}
                </p>
                <div>
                  {league?.match.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      leagueId: league.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Tennis' height='30vh' />
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
                  {league?.name}
                </p>
                <div>
                  {league?.match.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      leagueId: league.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Tennis' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Tennis
