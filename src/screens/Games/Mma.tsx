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
import { getMmaFixtures } from "../../redux/slices/MmaSlice";
import MmaGameCard from "../../components/GameCard/MmaGameCard";


function Mma() {
    const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState<any>([]);
  const [finished, setFinished] = useState<any>([]);
  const url = `${BaseUrl}/mma`;
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
    const payloadFinished = {
        status: "Final",
      };

    dispatch(getMmaFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });

    dispatch(getMmaFixtures(payloadFinished)).then((dd) => {
        setFinished(dd?.payload);
      });

  }, []);



  return (
    <div>
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
                    gameType: "Boxing",
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
            <MmaGameCard id={i} data={aa} />
          </div>
        );
      })}
       {
        upcoming?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for MMA/UFC"
          height="30vh"
        />
        :
        null
      }
    </div>
  )
}

export default Mma