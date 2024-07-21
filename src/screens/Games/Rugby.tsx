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


function Rugby() {
    const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState<any>([]);
  const [finished, setFinished] = useState<any>([]);
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
    const payloadFinished = {
        status: "Finished",
      };

    // dispatch(getBoxingFixtures(payloadUpcoming)).then((dd) => {
    //   setUpcoming(dd?.payload);
    // });

    // dispatch(getBoxingFixtures(payloadFinished)).then((dd) => {
    //     setFinished(dd?.payload);
    //   });

  }, []);

  console.log({upcoming, finished})

  return (
    <div>
       {
        finished?.data?.length < 1 && upcoming?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for American Football Rugby"
          height="30vh"
        />
        :
        null
      }
    </div>
  )
}

export default Rugby