import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../https'
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

function Basketball() {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const loading = useAppSelector(BasketballFixtureeStatusState) as any
  const maxMatchesToDisplay = 5

  // useEffect(() => {
  //   const socket = io(url) as any;

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server basketball");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("WebSocket connection error:", err);
  //   });

  //   socket.on("BasketEventUpdate", (message) => {
  //     setLive((prevMessages) => {
  //       const updatedMessages = prevMessages?.filter(
  //         (msg) => msg?.id !== message?.id
  //       );
  //       return [...updatedMessages, message];
  //     });
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'd1'
    }

    const payloadFinished = {
      range: 'd-1'
    }

    dispatch(getBasketballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })
    dispatch(getBasketballFixtures(null)).then((dd) => {
      setLive(dd?.payload)
    })
    dispatch(getBasketballFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })
  }, [dispatch])

  const [selectedStatus, setSelectedStatus] = useState('Finished')

  const status = [
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

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Basketball</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 'maxMatchesToDisplaypx'
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
            {live?.length > 0 && (
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
                {live?.length > maxMatchesToDisplay && (
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
                          gameType: 'Basketball'
                        }
                      })
                    }
                  >
                    View more
                  </p>
                )}
              </div>
            )}

            {live?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
                  <div key={i}>
                    <p
                      style={{
                        ...FONTS.body7,
                        backgroundColor: COLORS.lightRed,
                        padding: 5,
                        marginBottom: maxMatchesToDisplay,
                        borderRadius: 5,
                        color: COLORS.black,
                        marginRight: maxMatchesToDisplay
                      }}
                    >
                      {item?.name}
                    </p>
                    <div>
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
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
                )
            )}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.length > 0 && (
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
                {upcoming?.length > maxMatchesToDisplay && (
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
                          events: upcoming,
                          type: 'upcoming',
                          gameType: 'Basketball'
                        }
                      })
                    }
                  >
                    View more
                  </p>
                )}
              </div>
            )}

            {upcoming?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
                  <div key={i}>
                    <p
                      style={{
                        ...FONTS.body7,
                        backgroundColor: COLORS.lightRed,
                        padding: 5,
                        marginBottom: maxMatchesToDisplay,
                        borderRadius: 5,
                        color: COLORS.black,
                        marginRight: maxMatchesToDisplay
                      }}
                    >
                      {item?.name}
                    </p>
                    <div>
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
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
                )
            )}
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
                {finished?.length > maxMatchesToDisplay && (
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
                          events: finished,
                          type: 'finished',
                          gameType: 'Basketball'
                        }
                      })
                    }
                  >
                    View more
                  </p>
                )}
              </div>
            )}

            {finished?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
                  <div key={i}>
                    <p
                      style={{
                        ...FONTS.body7,
                        backgroundColor: COLORS.lightRed,
                        padding: 5,
                        marginBottom: maxMatchesToDisplay,
                        borderRadius: 5,
                        color: COLORS.black,
                        marginRight: maxMatchesToDisplay
                      }}
                    >
                      {item?.name}
                    </p>
                    <div>
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
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
                )
            )}
          </>
        ) : null}

        {live?.length < 1 && upcoming?.length < 1 && finished?.length < 1 ? (
          <EmptyState header='No Game Available for Basketball' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Basketball
