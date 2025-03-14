import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import { getSnookerFixtures } from '../../redux/slices/SnookerSlice'
import SnookerGameCard from '../../components/GameCard/SnookerGameCard'

function Snooker({ leagueName }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])

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
      status: 'Not Started'
    }
    const payloadFinished = {
      status: 'Finished'
    }

    dispatch(getSnookerFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })

    dispatch(getSnookerFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })
  }, [])

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
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Snooker</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
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
      {selectedStatus === 'Scheduled' ? (
        <>
          {upcomingOutput &&
            Object.keys(upcomingOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {upcomingOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={aa} />
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
          {finishedOutput &&
            Object.keys(finishedOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {finishedOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <SnookerGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      ) : null}
      {upcoming?.data?.length < 1 && finished?.data?.length < 1 ? (
        <EmptyState header='No Game Available for Snooker' height='30vh' />
      ) : null}
    </div>
  )
}

export default Snooker
