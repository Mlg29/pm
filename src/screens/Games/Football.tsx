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

function Football({ calendarDate }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() as any
  const [live, setLive] = useState<any>([])
  const loading = useAppSelector(footballFixtureStatusState) as any
  const [upcoming, setUpcoming] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const [finished, setFinished] = useState<any>([])

  const [selectedStatus, setSelectedStatus] = useState('Live')


  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }

    const payloadTomorrow = {
      range: calendarDate?.index
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getFootballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category)
    })

    dispatch(getFootballFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload?.category || [])
    })
    dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {

      setTomorrow(dd?.payload || [])
    })
    dispatch(getFootballFixtures(payloadUpcoming)).then((dd) => {

      setUpcoming(dd?.payload?.category || [])
    })
  }, [dispatch, selectedStatus])



  const fetchBetData = () => {
    dispatch(getFootballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category)
    })
  }

  useEffect(() => {
    const interval = setInterval(fetchBetData, 60000);
    return () => clearInterval(interval);
  }, []);


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
            {live?.map((item, i) => {

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

            {live?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.map((item, i) => {

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
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        country: item?.country,
                        leagueId: item?.leagueId,
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

            {upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finished?.map((item, i) => {
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
                    {item?.match?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        country: item?.country,
                        leagueId: item?.leagueId,
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

            {finished?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
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

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Football
