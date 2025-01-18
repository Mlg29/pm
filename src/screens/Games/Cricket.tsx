// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FONTS } from '../../utils/fonts'
// import { COLORS } from '../../utils/colors'

// import { io } from 'socket.io-client'
// import { BaseUrl } from '../../https'
// import moment from 'moment'
// import { useAppDispatch } from '../../redux/hooks'
// import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
// import EmptyState from '../../components/EmptyState'
// import { getCricketFixtures } from '../../redux/slices/CricketSlice'
// import CricketGameCard from '../../components/GameCard/CricketGameCard'

// function Cricket() {
//   const navigate = useNavigate()
//   const [upcoming, setUpcoming] = useState<any>([])
//   const [Live, setLive] = useState<any>([])
//   const dispatch = useAppDispatch() as any

//   // useEffect(() => {
//   //   const socket = io(url) as any;

//   //   socket.on("connect", () => {
//   //     console.log("Connected to WebSocket server tennis");
//   //   });

//   //   socket.on("connect_error", (err) => {
//   //     console.error("WebSocket connection error:", err);
//   //   });

//   //   socket.on("BoxingEventUpdate", (message) => {
//   //   //   setLive((prevMessages) => {
//   //   //     const updatedMessages = prevMessages?.filter(
//   //   //       (msg) => msg?.id !== message?.id
//   //   //     );
//   //   //     return [...updatedMessages, message];
//   //   //   });
//   //   });

//   //   // Cleanup on component unmount
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   let createdDate = moment(new Date()).utc().format()
//   let ScheduleDate = moment(createdDate).add(1, 'd')

//   useEffect(() => {
//     const payloadUpcoming = {
//       status: 'schedule'
//     }

//     dispatch(getCricketFixtures(payloadUpcoming)).then((dd) => {
//       setUpcoming(dd?.payload?.fixtures?.category)
//     })

//     dispatch(getCricketFixtures(null)).then((dd) => {
//       setLive(dd?.payload?.fixtures?.category)
//     })
//   }, [])

//   const groupedByData = (collectedData) => {
//     return collectedData?.reduce((acc, current) => {
//       const league = current?.leagueName || 'Cricket'

//       if (!acc[league]) {
//         acc[league] = []
//       }

//       acc[league].push(current)

//       return acc
//     }, {})
//   }

//   const upcomingOutput = groupedByData(upcoming?.data)

//   const LiveOutput = groupedByData(Live?.data)

//   const [selectedStatus, setSelectedStatus] = useState('Scheduled')

//   const status = [
//     {
//       id: 2,
//       name: 'Scheduled'
//     },
//     {
//       id: 3,
//       name: 'Live'
//     }
//   ]

//   return (
//     <div>
//       <div>
//         <p style={{ fontSize: 14, fontWeight: '500' }}>Cricket</p>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center'
//           }}
//         >
//           {status?.map((aa, i) => {
//             return (
//               <p
//                 key={i}
//                 onClick={() => setSelectedStatus(aa?.name)}
//                 style={{
//                   width: 80,
//                   padding: 3,
//                   cursor: 'pointer',
//                   backgroundColor:
//                     selectedStatus === aa?.name ? '#2D0D02' : 'gray',
//                   color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
//                   marginRight: 4,
//                   textAlign: 'center',
//                   fontSize: 12
//                 }}
//               >
//                 {aa?.name}
//               </p>
//             )
//           })}
//         </div>
//       </div>
//       {selectedStatus === 'Scheduled' ? (
//         <>
//           {upcoming?.data?.length > 0 && (
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}
//             >
//               <p
//                 style={{
//                   ...FONTS.body6,
//                   color: COLORS.gray,
//                   margin: '15px 0px'
//                 }}
//               ></p>
//               {upcoming?.total > 10 && (
//                 <p
//                   style={{
//                     ...FONTS.body7,
//                     color: COLORS.orange,
//                     cursor: 'pointer',
//                     margin: '15px 0px'
//                   }}
//                   onClick={() =>
//                     navigate('/events', {
//                       state: {
//                         events: upcoming,
//                         type: 'upcoming',
//                         gameType: 'Dart'
//                       }
//                     })
//                   }
//                 >
//                   View more
//                 </p>
//               )}
//             </div>
//           )}

//           {upcomingOutput &&
//             Object.keys(upcomingOutput)?.map((leagueName) => (
//               <div key={leagueName}>
//                 <p
//                   style={{
//                     ...FONTS.body7,
//                     backgroundColor: COLORS.lightRed,
//                     padding: 5,
//                     marginBottom: 10,
//                     borderRadius: 5,
//                     color: COLORS.black,
//                     marginRight: 10
//                   }}
//                 >
//                   {leagueName}
//                 </p>
//                 <div>
//                   {upcomingOutput[leagueName].map((aa, i) => {
//                     return (
//                       <div key={i}>
//                         <CricketGameCard id={i} data={aa} />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             ))}
//         </>
//       ) : null}

//       {selectedStatus === 'Live' ? (
//         <>
//           {Live?.data?.length > 0 && (
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}
//             >
//               <p
//                 style={{
//                   ...FONTS.body6,
//                   color: COLORS.gray,
//                   margin: '15px 0px'
//                 }}
//               ></p>
//               {Live?.total > 10 && (
//                 <p
//                   style={{
//                     ...FONTS.body7,
//                     color: COLORS.orange,
//                     cursor: 'pointer',
//                     margin: '15px 0px'
//                   }}
//                   onClick={() =>
//                     navigate('/events', {
//                       state: {
//                         events: Live,
//                         type: 'Live',
//                         gameType: 'Dart'
//                       }
//                     })
//                   }
//                 >
//                   View more
//                 </p>
//               )}
//             </div>
//           )}

//           {LiveOutput &&
//             Object.keys(LiveOutput)?.map((leagueName) => (
//               <div key={leagueName}>
//                 <p
//                   style={{
//                     ...FONTS.body7,
//                     backgroundColor: COLORS.lightRed,
//                     padding: 5,
//                     marginBottom: 10,
//                     borderRadius: 5,
//                     color: COLORS.black,
//                     marginRight: 10
//                   }}
//                 >
//                   {leagueName}
//                 </p>
//                 <div>
//                   {LiveOutput[leagueName].map((aa, i) => {
//                     return (
//                       <div key={i}>
//                         <CricketGameCard id={i} data={aa} />
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             ))}
//         </>
//       ) : null}

//       {upcoming?.data?.length < 1 && Live?.data?.length < 1 ? (
//         <EmptyState header='No Game Available for Cricket' height='30vh' />
//       ) : null}
//     </div>
//   )
// }

// export default Cricket

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../https'
import { io } from 'socket.io-client'
import moment from 'moment'
import {
  getCricketFixtures,
  CricketStatusState
} from '../../redux/slices/CricketSlice'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import CricketGameCard from '../../components/GameCard/CricketGameCard'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function Cricket() {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const url = `${BaseUrl}/Cricket`
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const loading = useAppSelector(CricketStatusState) as any
  const maxMatchesToDisplay = 5
  const [today, setToday] = useState<any>([])
  const [Schedule, setSchedule] = useState<any>([])

  let createdDate = moment(new Date()).utc().format()
  let ScheduleDate = moment(createdDate).add(1, 'd')

  useEffect(() => {

    const schedulePayload = {
      range: 'schedule'
    }

    dispatch(getCricketFixtures(null)).then((dd) => {
      setToday(dd?.payload)
    })
    dispatch(getCricketFixtures(schedulePayload)).then((dd) => {
      setSchedule(dd?.payload)
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
      name: 'Schedule'
    },
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Cricket</p>
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
          {today?.match?.length > 0 && (
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
              {today?.match?.length > 10 && (
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
                        gameType: 'Cricket'
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
                 <CricketGameCard id={i} data={aa} />
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
            {today?.match?.length > 0 && (
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

            {today?.match?.map((item, i) =>  i < maxMatchesToDisplay && (
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
                <CricketGameCard id={i} data={item} />
              </div>
            ))}
          </>
        ) : null}

        {selectedStatus === 'Schedule' ? (
          <>
            {Schedule?.match?.length > 0 && (
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

            {Schedule?.match?.map((item, i) =>  i < maxMatchesToDisplay && (
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
                <CricketGameCard id={i} data={item} />
              </div>
            ))}
          </>
        ) : null}
        {upcoming?.match?.length < 1 && today?.match?.length < 1 ? (
          <EmptyState header='No Game Available for Cricket' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Cricket
