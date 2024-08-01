import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import TennisGameCard from "../../components/GameCard/TennisGameCard";
import { io } from "socket.io-client";
import { BaseUrl } from "../../https";
import moment from "moment";
import { useAppDispatch } from "../../redux/hooks";
import { getTennisFixtures } from "../../redux/slices/TennisSlice";
import EmptyState from "../../components/EmptyState";

function Tennis() {
  const navigate = useNavigate();
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const url = `${BaseUrl}/tennis`;
  const dispatch = useAppDispatch() as any;

  useEffect(() => {
    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server tennis");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });


    socket.on("TennisEventUpdate", (message) => {
      console.log({message})
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
    const notYetPayloadUpcoming = {
      status: "Not Started",
    };
    const tennisPayloadLive = {
      status: "Live",
    };

    dispatch(getTennisFixtures(notYetPayloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
    dispatch(getTennisFixtures(tennisPayloadLive)).then((dd) => {
      setLive(dd?.payload?.data);
    });
  }, []);



  return (
    <div>
      {live?.length > 0 && (
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
                    gameType: "Tennis",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}
      {live?.filter((a, i) => i < 10)?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <TennisGameCard id={i} data={aa} />
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
                    gameType: "Tennis",
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
            <TennisGameCard id={i} data={aa} />
          </div>
        );
      })}

{
        live?.length < 1 && upcoming?.data?.length < 1 ?
        <EmptyState 
          header="No Game Available for Tennis"
          height="30vh"
        />
        :
        null
      }
    </div>
  );
}

export default Tennis;
