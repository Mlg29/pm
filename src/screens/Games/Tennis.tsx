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

function Tennis({ calendarDate }) {
  const [live, setLive] = useState<any>([])
  // const loading = useAppSelector(tennisFixtureStatusState) as any
  const [loading, setLoading] = useState(false)
  const [Finished, setFinished] = useState<any>([])
  const [scheduled, setScheduled] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const dispatch = useAppDispatch() as any
  let createdDate = moment(new Date()).utc().format()

  useEffect(() => {
    const PayloadFinished = {
      range: 'finished'
    }
    const PayloadScheduled = {
      range: 'upcoming'
    }
    const payloadTomorrow = {
      range: calendarDate?.index
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
    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getTennisFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload?.category || [])
      })
    }
  }, [calendarDate])

  const fetchBetData = () => {
    dispatch(getTennisFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category || [])
    })
  }

  useEffect(() => {
    const interval = setInterval(fetchBetData, 60000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const PayloadScheduled = {
      range: 'upcoming'
    }
    dispatch(getTennisFixtures(PayloadScheduled)).then((dd) => {
      setScheduled(dd?.payload?.category || [])
    })
  }, [])


  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match?.filter(match => match?.status?.toLowerCase().includes("set"))
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Interrupted" || match.status === "Finished")
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
              <p
                key={i}
                onClick={() => setSelectedStatus(aa?.name)}
                style={{
                  width: 80,
                  padding: 3,
                  cursor: 'pointer',
                  backgroundColor:
                    selectedStatus === aa?.name ? '#2D0D02' : 'gray',
                  color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                  marginRight: 4,
                  textAlign: 'center',
                  fontSize: 12
                }}
              >
                {aa?.name}
              </p>
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
            {Array.isArray(scheduled) && scheduled?.map((league, index) => {
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

            {scheduled?.length < 1 ? (
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
