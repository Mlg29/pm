import React, { useEffect, useState } from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard";
import { useAppDispatch } from "../../redux/hooks";
import { BaseUrl,SportBaseUrl } from "../../https";
import { getFootballFixtures } from "../../redux/slices/FootballSlice";
import moment from "moment";
import { io } from "socket.io-client";
import EmptyState from "../../components/EmptyState";

function Football() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch() as any;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);
  const [finished, setFinished] = useState<any>([]);
  const url = `${SportBaseUrl}/soccer`;

  // useEffect(() => {
  //   const socket = io(url) as any;

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("WebSocket connection error:", err);
  //   });

 
  //   socket.on("footballEventUpdate", (message) => {
  //     setLive((prevMessages) => {
  //       const updatedMessages = prevMessages?.filter(
  //         (msg) => msg.id !== message.id
  //       );
  //       return [...updatedMessages, message];
  //     });
  //   });

 
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const payloadUpcoming = {
      range: 'd1'
    };
    const payloadLive = {
      range: "live",
    };
    const payloadToday = {
      date: 'home',
    };
    const payloadTomorrow = {
      range: 'd2',
    };
    const payloadFinished = {
      range: 'd-1'
    };

    dispatch(getFootballFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload);
    });
    // dispatch(getFootballFixtures(payloadToday)).then((dd) => {
    //   setToday(dd?.payload);
    // });
    dispatch(getFootballFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {
      setTomorrow(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
  }, []);





  const [selectedStatus, setSelectedStatus] = useState('Live')

  const status = [
    {
      id: 1,
      name: 'Live',
    },
    {
      id: 2,
      name: "Scheduled"
    },
    {
      id: 3,
      name: 'Finished',
    },
    {
      id: 2,
      name: "Next Day"
    }
  ]


  return (
    <div>
      <div>
        <p style={{fontSize: 14, fontWeight: '500'}}>Soccer</p>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {
            status?.map((aa, i) => {
              return  <p key={i} onClick={() => setSelectedStatus(aa?.name)} style={{width: 80, padding: 3,cursor: 'pointer', backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'gray', color:selectedStatus === aa?.name ? 'white' : '#2d0d02', marginRight: 4, textAlign: 'center', fontSize: 12}}>{aa?.name}</p>
            })
          }
        </div>
      </div>
     {
      selectedStatus === "Live" ?
      <>
       {live?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            
          </p>

          {live?.length > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: live,
                    type: "live",
                    gameType: "Soccer",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
         {live?.map((item, i) => (
        <div key={i}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
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
                  <GameCard id={i} data={payload} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </>
      : null
     }

     {
      selectedStatus === "Scheduled" ?
      <>
       {upcoming?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            
          </p>

          {upcoming?.length > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: upcoming,
                    type: "upcoming",
                    gameType: "Soccer",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
         {upcoming?.map((item, i) => (
        <div key={i}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
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
                  <GameCard id={i} data={payload} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </>: null
     }

     {
      selectedStatus === "Finished" ?
      <>
      {finished?.length > 0 && (
       <div
         style={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
         }}
       >
         <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
           
         </p>

         {finished?.length > 10 && (
           <p
             style={{
               ...FONTS.body7,
               color: COLORS.orange,
               cursor: "pointer",
               margin: "15px 0px",
             }}
             onClick={() =>
               navigate("/events", {
                 state: {
                   events: finished,
                   type: "finished",
                   gameType: "Soccer",
                 },
               })
             }
           >
             View more
           </p>
         )}
       </div>
     )}
        {finished?.map((item, i) => (
       <div key={i}>
         <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
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
                 <GameCard id={i} data={payload} />
               </div>
             );
           })}
         </div>
       </div>
     ))}
     </>: null
     }

      {
        selectedStatus === "Next Day" ?
        <>
       {tomorrow?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            
          </p>

          {tomorrow?.length > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: tomorrow,
                    type: "tomorrow",
                    gameType: "Soccer",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
         {tomorrow?.map((item, i) => (
        <div key={i}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
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
                  <GameCard id={i} data={payload} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </>
        : null
      }
      {live?.length < 1 &&
      upcoming?.length < 1 &&
      today?.length < 1 &&
      tomorrow?.length < 1 ? (
        <EmptyState header="No Game Available for Football" height="30vh" />
      ) : null}
    </div>
  );
}

export default Football;
