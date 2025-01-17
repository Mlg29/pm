import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../https'
import { io } from 'socket.io-client'
import moment from 'moment'
import {
  getHorseFixtures,
  horseFixtureStatusState
} from '../../redux/slices/horseSlice'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import HorseGameCard from '../../components/GameCard/HorseGameCard'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function HorseRace() {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const url = `${BaseUrl}/horse`
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(horseFixtureStatusState) as any
  const maxMatchesToDisplay = 5
  const [today, setToday] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }
    dispatch(getHorseFixtures(null)).then((dd) => {
      setToday(dd?.payload)
    })
    dispatch(getHorseFixtures(payloadUpcoming)).then((dd) => {
      setTomorrow(dd?.payload)
    })
    dispatch(getHorseFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })

    return
  }, [])

  const [selectedStatus, setSelectedStatus] = useState('Today')

  const status = [
    {
      id: 1,
      name: 'Today'
    },
    {
      id: 2,
      name: 'Tomorrow'
    },
    {
      id: 3,
      name: 'Finished'
    }
  ]

  // if (loader) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flex: 1,
  //         height: "100vh",
  //       }}
  //     >
  //       <Loader />
  //     </div>
  //   );
  // }

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
      {selectedStatus === 'Today' ? (
        <>
          {today?.length > 0 && (
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
              {today?.length > maxMatchesToDisplay && (
                <p
                  style={{
                    ...FONTS.body7,
                    color: COLORS.orange,
                    cursor: 'pointer',
                    margin: '15px 0px'
                  }}
                  onClick={() =>
                    navigate('/events', {
                      state: {
                        events: live,
                        type: 'live',
                        gameType: 'Horse'
                      }
                    })
                  }
                >
                  View more
                </p>
              )}
            </div>
          )}
        </>
      ) : null}

      {/*{liveOutput && Object.keys(liveOutput)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {liveOutput[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                 <HorseGameCard id={i} data={aa} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
        </>
        : null
      } */}
      <LoadingState isLoading={loading}>
        {selectedStatus === 'Today' ? (
          <>
            {today?.length > 0 && (
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

            {today?.map((item, i) => i < maxMatchesToDisplay && (
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
          </>
        ) : null}

        {selectedStatus === 'Tomorrow' ? (
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

            {tomorrow?.map((item, i) => i < maxMatchesToDisplay && (
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
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finished?.length > 0 && (
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

            {finished?.map((item, i) => (
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
          </>
        ) : null}

        {upcoming?.length < 1 && today?.length < 1 && finished?.length < 1 ? (
          <EmptyState header='No Game Available for Horse Race' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default HorseRace
