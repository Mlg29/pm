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
import { getFutsalFixtures } from "../../redux/slices/Futsal";
import FutsalGameCard from "../../components/GameCard/FutsalGameCard";


function Futsol() {
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

    dispatch(getFutsalFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });

    // dispatch(getBoxingFixtures(payloadFinished)).then((dd) => {
    //     setFinished(dd?.payload);
    //   });

  }, []);

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league =  current?.leagueName || "Futsal";

      if (!acc[league]) {
        acc[league] = [];
      }

      acc[league].push(current);

      return acc;
    }, {});
  };



  const upcomingOutput = groupedByData(upcoming?.data)

 

  return (
    <div>
       {
      upcoming?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for Futsol"
          height="30vh"
        />
        :
        null
      }

{upcomingOutput && Object.keys(upcomingOutput)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {upcomingOutput[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                 <FutsalGameCard id={i} data={aa} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Futsol