import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../https";
import { io } from "socket.io-client";
import moment from "moment";
import { getHorseFixtures } from "../../redux/slices/horseSlice";
import Loader from "../../components/Loader";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import HorseGameCard from "../../components/GameCard/HorseGameCard";

function HorseRace() {
  const dispatch = useAppDispatch() as any;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/horse`;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);

  useEffect(() => {
    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server horse");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("HorseEventUpdate", (message) => {
      console.log("horse==", { message });
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
      status: "Not Started",
    };
    const payloadLive = {
      status: "Live",
    };
    const payloadToday = {
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    const payloadTomorrow = {
      date: tomorrowDate.format("YYYY-MM-DD"),
    };

    dispatch(getHorseFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
    dispatch(getHorseFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload?.data);
    });
    return;
  }, []);


  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

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
                    gameType: "Horse",
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
            <HorseGameCard id={i} data={aa} />
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
                    gameType: "Horse",
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
            <HorseGameCard id={i} data={aa} />
          </div>
        );
      })}
    </div>
  );
}

export default HorseRace;
