import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { BaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  boxingFixtureStatusState,
  getBoxingFixtures
} from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import BoxingGameCard from '../../components/GameCard/BoxingGameCard'
import { LoadingState } from '../../components/LoadingState'

function Boxing() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(boxingFixtureStatusState) as any
  const maxMatchesToDisplay = 5
  const url = `${BaseUrl}/boxing`
  const dispatch = useAppDispatch() as any

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

    dispatch(getBoxingFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload?.scores?.categories)
    })

    dispatch(getBoxingFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload?.scores?.categories)
    })
  }, [])

  console.log({ upcoming })

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league = current?.name

      if (!acc[league]) {
        acc[league] = []
      }

      acc[league].push(current)

      return acc
    }, {})
  }

  const upcomingOutput = groupedByData(upcoming?.data)
  const finishedOutput = groupedByData(finished?.data)

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
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Boxing</p>
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
                        marginBottom: 10,
                        borderRadius: 5,
                        color: COLORS.black,
                        marginRight: 10
                      }}
                    >
                      {item?.name}
                    </p>
                    <div>
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          name: item?.name,
                          ...aa
                        }
                        return <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
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
                        marginBottom: 10,
                        borderRadius: 5,
                        color: COLORS.black,
                        marginRight: 10
                      }}
                    >
                      {item?.name}
                    </p>
                    <div>
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          name: item?.name,
                          ...aa
                        }
                        return <div key={i}>
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      })}
                    </div>
                  </div>
                )
            )}
          </>
        ) : null}
        {upcoming?.length < 1 && finished?.length < 1 ? (
          <EmptyState header='No Game Available for Boxing' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Boxing
