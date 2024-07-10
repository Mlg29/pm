import React, { useEffect, useState } from 'react'
import { FONTS } from '../../utils/fonts';
import { COLORS } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/GameCard';
import { useAppDispatch } from '../../redux/hooks';
import { BaseUrl } from "../../https";
import { getFootballFixtures } from '../../redux/slices/FootballSlice';
import moment from 'moment';
import { io } from 'socket.io-client';

function Football() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch() as any;
    const [live, setLive] = useState<any>([]);
    const [upcoming, setUpcoming] = useState<any>([]);
    const [today, setToday] = useState<any>([]);
    const [tomorrow, setTomorrow] = useState<any>([]);
    const url = `${BaseUrl}/football`;

    

    useEffect(() => {
      const socket = io(url) as any;
  
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });
  
      socket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err);
      });
  
      // Handle incoming messages
      socket.on("footballEventUpdate", (message) => {
        setLive((prevMessages) => {
          const updatedMessages = prevMessages?.filter(
            (msg) => msg.id !== message.id
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
      const payloadToday = {
        date: moment(new Date()).format("YYYY-MM-DD"),
      };
      const payloadTomorrow = {
        date: tomorrowDate.format("YYYY-MM-DD"),
      };
  
  
    dispatch(getFootballFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload?.data);
    });
    dispatch(getFootballFixtures(payloadToday)).then((dd) => {
      setToday(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {
      setTomorrow(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
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
                    gameType: "Soccer"
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {live
        ?.filter((a, i) => i < 10)
        .map((aa: any, i: any) => {
          return (
            <div key={i}>
              <GameCard id={i} data={aa} />
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
                    gameType: "Soccer"
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
            <GameCard id={i} data={aa} />
          </div>
        );
      })}

      {today?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            TODAY
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
                    type: "today",
                    gameType: "Soccer"
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {today?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <GameCard id={i} data={aa} />
          </div>
        );
      })}

      {tomorrow?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            TOMORROW
          </p>
          {tomorrow?.total > 10 && (
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
                    gameType: "Soccer"
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {tomorrow?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <GameCard id={i} data={aa} />
          </div>
        );
      })}
    </div>
  )
}

export default Football
