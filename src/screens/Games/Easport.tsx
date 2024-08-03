import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";

import { io } from "socket.io-client";
import { BaseUrl } from "../../https";
import moment from "moment";
import { useAppDispatch } from "../../redux/hooks";
import { getBoxingFixtures } from "../../redux/slices/BoxingSlice";
import EmptyState from "../../components/EmptyState";
import { getEasportFixtures } from "../../redux/slices/Easport";
import EsportGameCard from "../../components/GameCard/EsportGameCard";


function Easport() {
    const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState<any>([]);
  const [live, setLive] = useState<any>([]);
  const url = `${BaseUrl}/boxing`;
  const dispatch = useAppDispatch() as any;

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

  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const payloadUpcoming = {
      status: "Not Started",
    };
    const payloadLive = {
        status: "Started",
      };

    dispatch(getEasportFixtures(payloadUpcoming)).then((dd) => {
      console.log({dd})
      setUpcoming(dd?.payload);
    });

    dispatch(getEasportFixtures(payloadLive)).then((dd) => {
        setLive(dd?.payload);
      });

  }, []);



  return (
    <div>
        {live?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            LIVE
          </p>
          {live?.total > 10 && (
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
                    gameType: "Esport",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
      {live?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <EsportGameCard id={i} data={aa} />
          </div>
        );
      })}
        {upcoming?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            UPCOMING
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
                    gameType: "Esport",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
      {upcoming?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <EsportGameCard id={i} data={aa} />
          </div>
        );
      })}
       {
        live?.data?.length < 1 && upcoming?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for Easport"
          height="30vh"
        />
        :
        null
      }
    </div>
  )
}

export default Easport