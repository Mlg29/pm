import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../https";
import { io } from "socket.io-client";
import moment from "moment";

import Loader from "../../components/Loader";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { getBasketballFixtures } from "../../redux/slices/BasketballSlice";
import EmptyState from "../../components/EmptyState";
import BasketballGameCard from "../../components/GameCard/BasketballGameCard";



function Basketball() {
  const dispatch = useAppDispatch() as any;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/basketball`;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);




  useEffect(() => {
    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server basketball");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("BasketEventUpdate", (message) => {
      setLive((prevMessages) => {
        const updatedMessages = prevMessages?.filter(
          (msg) => msg?.id !== message?.id
        );
        return [...updatedMessages, message];
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const payloadUpcoming = {
      status: "UPCOMING",
    };
    const payloadLive = {
      status: "LIVE",
    };
    const payloadOther = {
      status: "ENDED",
    };
    const payloadToday = {
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    const payloadTomorrow = {
      date: tomorrowDate.format("YYYY-MM-DD"),
    };

    dispatch(getBasketballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
    dispatch(getBasketballFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload?.data);
    });
    dispatch(getBasketballFixtures(payloadOther)).then((dd) => {
      setToday(dd?.payload);
    });
    return;
  }, []);


  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league = current?.leagueName;

      if (!acc[league]) {
        acc[league] = [];
      }

      acc[league].push(current);

      return acc;
    }, {});
  };

  const liveOutput = groupedByData(live)

  const upcomingOutput = groupedByData(upcoming?.data)
  const todayOutput = groupedByData(today?.data)


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
      name: "Finished"
    }
  ]


  return (
    <div>
       <div>
        <p style={{fontSize: 14, fontWeight: '500'}}>Basketball</p>
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
                    gameType: "Basketball",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
     
       {liveOutput && Object.keys(liveOutput)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {liveOutput[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <BasketballGameCard id={i} data={aa} />
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
           {upcoming?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
  
          </p>
          {upcoming?.total > 10 && (
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
                    gameType: "Basketball",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

        {upcomingOutput && Object.keys(upcomingOutput)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {upcomingOutput[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <BasketballGameCard id={i} data={aa} />
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
        selectedStatus === "Finished" ?
        <>
           {today?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
  
          </p>
          {today?.total > 10 && (
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
                    events: today,
                    type: "finished",
                    gameType: "Basketball",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

        {todayOutput && Object.keys(todayOutput)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {todayOutput[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <BasketballGameCard id={i} data={aa} />
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
        live?.length < 1 && upcoming?.data?.length < 1 && today?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for Basketball"
          height="30vh"
        />
        :
        null
      }
    </div>
  )
}

export default Basketball
