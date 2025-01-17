import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { BaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import {
  getMmaFixtures,
  mmaFixtureStatusState
} from '../../redux/slices/MmaSlice'
import MmaGameCard from '../../components/GameCard/MmaGameCard'
import { LoadingState } from '../../components/LoadingState'

function Mma() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const maxMatchesToDisplay = 5
  const loading = useAppSelector(mmaFixtureStatusState) as any

  // useEffect(() => {
  //   const socket = io(url) as any;

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server tennis");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("WebSocket connection error:", err);
  //   });

  //   socket.on("BoxingEventUpdate", (message) => {
  //   //   setLive((prevMessages) => {
  //   //     const updatedMessages = prevMessages?.filter(
  //   //       (msg) => msg?.id !== message?.id
  //   //     );
  //   //     return [...updatedMessages, message];
  //   //   });
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getMmaFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload?.category)
    })

    dispatch(getMmaFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload?.category)
    })
  }, [])

  // const groupedByData = (collectedData) => {
  //   return collectedData?.reduce((acc, current) => {
  //     const league = current?.name
  //     if (!acc[league]) {
  //       acc[league] = []
  //     }
  //     acc[league].push(current)
  //     return acc
  //   }, {})
  // }
  // const upcomingOutput = groupedByData(upcoming?.match)
  // const finishedOutput = groupedByData(finished?.match)

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

  const status = [
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>MMA</p>
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
                          gameType: 'Boxing'
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
              (league, index) =>
                index < maxMatchesToDisplay && (
                  <div key={league?.id}>
                    {league?.name && league?.match?.length > 0 && (
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
                        {league.name}
                      </p>
                    )}
                    <div>
                      {league?.match?.map((aa, i) => (
                        <div key={i}>
                          <MmaGameCard id={index} data={aa} />
                        </div>
                      ))}
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
                          gameType: 'Boxing'
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
              (league, index) =>
                index < maxMatchesToDisplay && (
                  <div key={league?.id}>
                    {league?.name && league?.match?.length > 0 && (
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
                    )}
                    <div>
                      {league?.match?.map((aa, i) => (
                        <div key={i}>
                          <MmaGameCard id={index} data={aa} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </>
        ) : null}
        {upcoming?.length < 1 && finished?.length < 1 ? (
          <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Mma
