import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import moment from 'moment'
import {
  getHorseFixtures,
  horseFixtureStatusState
} from '../../redux/slices/horseSlice'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import HorseGameCard from '../../components/GameCard/HorseGameCard'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";
import { SportSportBaseUrl } from '../../https'

function HorseRace() {
  const dispatch = useAppDispatch() as any
  const [finished, setFinished] = useState<any>([])
  // const loading = useAppSelector(horseFixtureStatusState) as any
  const [loading, setLoading] = useState(false)
  const [calendarDate, setCalendarDate] = useState<{ index: string; formattedDate: string } | null>(null);
  const [Live, setLive] = useState<any>([])
  const [Schedule, setSchedule] = useState<any>([])

  let createdDate = moment(new Date()).utc().format()
  let ScheduleDate = moment(createdDate).add(1, 'd')

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("horseRacingUpdates", (message) => {
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
    dispatch(getHorseFixtures(null)).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.tournaments || dd?.payload?.races || [])
      setLoading(false)
    })


    return
  }, [])


  useEffect(() => {
    const payloadUpcoming = {
      range: calendarDate?.index
    }

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getHorseFixtures(payloadUpcoming)).then((dd) => {
        setSchedule(dd?.payload?.scores?.tournaments || [])
      })
    }

  }, [calendarDate])



  const liveMatches = (Array.isArray(Live) ? Live : [Live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    races: league?.races.filter(match => match.status === "Set 1" || match.status === "Set 2" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.races.length > 0);

  const upcomingMatches = (Array.isArray(Live) ? Live : [Live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    races: league?.races.filter(match => match?.status === "Not Started" || match?.results === "Upcoming race")
  }))
    .filter(league => league?.races.length > 0);


  const finishedMatches = (Array.isArray(Live) ? Live : [Live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    races: league?.races.filter(match => match.status === "Cancelled" || match.status === "Finished")
  }))
    .filter(league => league?.races.length > 0);

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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Horse Race</p>
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
                    onClick={() => console.log('Cancel clicked')}
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
      {selectedStatus === 'Live' ? (
        <>
          {liveMatches?.length > 0 && (
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
        </>
      ) : null}

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
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {item?.name}
                </p>
                <div>
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((item, i) => (
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
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
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
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {item?.name}
                </p>
                <div>
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {Schedule?.map((item, i) => (
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
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {Schedule?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default HorseRace
