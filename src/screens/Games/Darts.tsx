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
import { getDartFixtures } from "../../redux/slices/DartSlice";
import DartGameCard from "../../components/GameCard/DartGameCard";

function Darts() {
  const navigate = useNavigate();

  const [upcoming, setUpcoming] = useState<any>([]);
  const [finished, setFinished] = useState<any>([]);
  const url = `${BaseUrl}/dart`;
  const dispatch = useAppDispatch() as any;

  // useEffect(() => {
  //   const socket = io(url) as any;

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server dart");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("WebSocket connection error:", err);
  //   });

  //   socket.on("DartEventUpdate", (message) => {
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

  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const payloadUpcoming = {
      status: "Not Started",
    };
    const payloadFinished = {
      status: "Finished",
    };

    dispatch(getDartFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });

    // dispatch(getBoxingFixtures(payloadFinished)).then((dd) => {
    //     setFinished(dd?.payload);
    //   });
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
                    gameType: "Dart",
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
            <DartGameCard id={i} data={aa} />
          </div>
        );
      })}
      {finished?.data?.length < 1 && upcoming?.data?.length < 1 ? (
        <EmptyState header="No Game Available for Darts" height="30vh" />
      ) : null}
    </div>
  );
}

export default Darts;
