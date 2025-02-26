import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import {
  AflStatusState,
  getAflFixtureLive,
  getAflFixtures
} from '../../redux/slices/AflSlice'
import AflGameCard from '../../components/GameCard/AflGameCard'
import { LoadingState } from '../../components/LoadingState'

function Rugby({ leagueName }) {
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [Live, setLive] = useState<any>([])
  const loading = useAppSelector(AflStatusState) as any
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }

    const payloadFinished = {
      range: 'finished'
    }


    dispatch(getAflFixtureLive()).then((dd) => {
      const filterData = dd?.payload?.category?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase()))
      setLive(filterData || [])
    })
  }, [])

  const [selectedStatus, setSelectedStatus] = useState('Live')

  const status = [
    {
      id: 2,
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


  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>AFL</p>
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
            {/* <div>
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
              {Live.name}
            </p>
            <div>
              {Array.isArray(Live) && Live?.map((aa, i) => {
                const payload = {
                  league: aa?.name,
                  leagueId: aa?.id,
                  ...aa
                }
                return (
                  <div key={i}>
                    <AflGameCard id={i} data={payload} />
                  </div>
                )
              })}
            </div>
          </div> */}

            {
              Live?.length < 1 ? (
                <EmptyState
                  header='No Game Available for American Football Rugby'
                  height='30vh'
                />
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
                    {item?.name}
                  </p>
                  <div>
                    {item?.week?.map((weekItem, i) => {
                      const { matches, name: leagueName } = weekItem
                      return matches?.map((matchInfo, matchIndex) => {
                        if (matchInfo?.match) return (
                          matchInfo?.match?.map((details, detailsIndex) => {
                            const payload = {
                              league: leagueName,
                              ...details
                            }
                            return (
                              <div key={`${i}-${matchIndex}-${detailsIndex}`}>
                                <AflGameCard id={matchIndex} data={payload} />
                              </div>
                            )
                          })
                        )
                      })
                    })}
                  </div>
                </div>
              )
            })}

            {upcoming?.length < 1 ? (
              <EmptyState
                header='No Game Available for American Football Rugby'
                height='30vh'
              />
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
                    {item?.name}
                  </p>
                  <div>
                    {item?.week?.map((weekItem, i) => {
                      const { matches, name: leagueName } = weekItem
                      return matches?.map((matchInfo, matchIndex) => {
                        if (matchInfo?.match) return (
                          matchInfo?.match?.map((details, detailsIndex) => {
                            const payload = {
                              league: leagueName,
                              ...details
                            }
                            return (
                              <div key={`${i}-${matchIndex}-${detailsIndex}`}>
                                <AflGameCard id={matchIndex} data={payload} />
                              </div>
                            )
                          })
                        )
                      })
                    })}
                  </div>
                </div>
              )
            })}

            {finished?.length < 1 ? (
              <EmptyState
                header='No Game Available for American Football Rugby'
                height='30vh'
              />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Rugby
