import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import TennisGameCard from '../../components/GameCard/TennisGameCard'
import { io } from 'socket.io-client'
import { BaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTennisFixtures, tennisFixtureStatusState } from '../../redux/slices/TennisSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function Tennis() {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const maxMatchesToDisplay = 5
  const loading = useAppSelector(tennisFixtureStatusState) as any
  const [upcoming, setUpcoming] = useState<any>([])
  const url = `${BaseUrl}/tennis`
  const dispatch = useAppDispatch() as any

  // useEffect(() => {
  //   const socket = io(url) as any;

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server tennis");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("WebSocket connection error:", err);
  //   });

  //   socket.on("TennisEventUpdate", (message) => {

  //     setLive((prevMessages) => {
  //       const updatedMessages = prevMessages?.filter(
  //         (msg) => msg?.id !== message?.id
  //       );
  //       return [...updatedMessages, message];
  //     });
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const notYetPayloadUpcoming = {
      range: "d1",
    };

    dispatch(getTennisFixtures(null)).then((dd) => {
      setUpcoming(dd?.payload?.scores);
    });
    dispatch(getTennisFixtures(null)).then((dd) => {
      setLive(dd?.payload?.scores)
    })
  }, [])

  // const groupedByData = (collectedData) => {
  //   return collectedData?.reduce((acc, current) => {
  //     const league = current?.tournamentName;

  //     if (!acc[league]) {
  //       acc[league] = [];
  //     }

  //     acc[league].push(current);

  //     return acc;
  //   }, {});
  // };

  // const liveOutput = groupedByData(live)

  // const upcomingOutput = groupedByData(upcoming?.data)

  const [selectedStatus, setSelectedStatus] = useState('Live')

  const status = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Scheduled'
    }
  ]

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Tennis</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
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
            {live?.category?.length > 0 && (
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
                {live?.category?.length > maxMatchesToDisplay && (
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
                          gameType: 'Tennis'
                        }
                      })
                    }
                  >
                    View more
                  </p>
                )}
              </div>
            )}

            {live?.category?.map((league, index) => index < maxMatchesToDisplay && (
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
                  {live?.category[index]?.match?.map((aa, i) => {
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.category?.length > 0 && (
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
                {upcoming?.category.length > maxMatchesToDisplay && (
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
                          gameType: 'Tennis'
                        }
                      })
                    }
                  >
                    View more
                  </p>
                )}
              </div>
            )}

            {upcoming?.category?.map((league, index) => index < maxMatchesToDisplay && (
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
                  {upcoming?.category[index]?.match.map((aa, i) => {
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}

        {live?.category?.length < 1 && upcoming?.category?.length < 1 ? (
          <EmptyState header='No Game Available for Tennis' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Tennis
