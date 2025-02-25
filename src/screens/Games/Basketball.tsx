import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import {
  getBasketballFixtures,
  BasketballFixtureeStatusState
} from '../../redux/slices/BasketballSlice'
import EmptyState from '../../components/EmptyState'
import BasketballGameCard from '../../components/GameCard/BasketballGameCard'
import { LoadingState } from '../../components/LoadingState'

function Basketball({ calendarDate }) {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const loading = useAppSelector(BasketballFixtureeStatusState) as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')
  const [selectedStatus, setSelectedStatus] = useState('Finished')

  useEffect(() => {
    const payloadTomorrow = {
      range: calendarDate?.index
    }


    dispatch(getBasketballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category || dd?.payload || [])
    })

    dispatch(getBasketballFixtures(payloadTomorrow)).then((dd) => {
      setTomorrow(dd?.payload || [])
    })
  }, [dispatch, calendarDate?.formattedDate])

  const fetchBetData = () => {
    dispatch(getBasketballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category || dd?.payload || [])
    })
  }

  useEffect(() => {
    const interval = setInterval(fetchBetData, 60000);
    return () => clearInterval(interval);
  }, []);


  const liveMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status > 0 || match.status === "HT")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Finished")
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Basketball</p>
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
                  {item?.name || item?.league}
                </p>
                <div>
                  {item?.match?.map((aa, i) => {
                    const payload = {
                      league: item?.name || item?.league,
                      country: item?.fileGroup || item?.country,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <BasketballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Basketball' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((item, i) => {

              return <div key={i} >
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
                      country: item?.fileGroup || item?.country,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <BasketballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Basketball' height='30vh' />
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
                      country: item?.fileGroup || item?.country,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <BasketballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Basketball' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {tomorrow?.length > 0 && (
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
                      country: item?.fileGroup || item?.country,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <BasketballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Basketball' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div >
  )
}

export default Basketball
