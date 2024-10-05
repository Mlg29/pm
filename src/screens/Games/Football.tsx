import React, { useEffect, useState } from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard";
import { useAppDispatch } from "../../redux/hooks";
import { BaseUrl } from "../../https";
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

  const groupedByLeague = live?.filter((a, i) => i < 10).reduce((acc, current) => {
    const league = current?.leagueName;

    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push(current);

    return acc;
  }, {});


  const groupedByUpcomingLeague =  upcoming?.data?.reduce((acc, current) => {
    const league = current?.leagueName;

    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push(current);

    return acc;
  }, {});


  const groupedByTodayLeague =  today?.data?.reduce((acc, current) => {
    const league = current?.leagueName;

    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push(current);

    return acc;
  }, {});


  const groupedByTomorrowLeague = tomorrow?.data?.reduce((acc, current) => {
    const league = current?.leagueName;

    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push(current);

    return acc;
  }, {});


  const [selectedStatus, setSelectedStatus] = useState('Live')

  const status = [
    {
      id: 1,
      name: 'Live',
    },
    {
      id: 2,
      name: "Upcoming"
    },
    {
      id: 3,
      name: 'Today',
    },
    {
      id: 2,
      name: "Tomorrow"
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
         {groupedByLeague && Object.keys(groupedByLeague)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {groupedByLeague[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <GameCard id={i} data={aa} />
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
      selectedStatus === "Upcoming" ?
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

         {groupedByUpcomingLeague && Object.keys(groupedByUpcomingLeague)?.map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {groupedByUpcomingLeague[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <GameCard id={i} data={aa} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </> : null
     }

     {
      selectedStatus === "Today" ?
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
                    type: "today",
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

         {groupedByTodayLeague && Object.keys(groupedByTodayLeague)?.filter((a, i) => i < 10).map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {groupedByTodayLeague[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <GameCard id={i} data={aa} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </>: null
     }

      {
        selectedStatus === "Tomorrow" ?
        <>
          {tomorrow?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
        
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

        {groupedByTomorrowLeague && Object.keys(groupedByTomorrowLeague)?.filter((a, i) => i < 10).map((leagueName) => (
        <div key={leagueName}>
          <p style={{ ...FONTS.body7,backgroundColor: COLORS.lightRed, padding: 5, marginBottom: 10, borderRadius: 5, color: COLORS.black, marginRight: 10 }}>
            {leagueName}
          </p>
          <div>
            {groupedByTomorrowLeague[leagueName].map((aa, i) => {
              return (
                <div key={i}>
                  <GameCard id={i} data={aa} />
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
      upcoming?.data?.length < 1 &&
      today?.data?.length < 1 &&
      tomorrow?.data?.length < 1 ? (
        <EmptyState header="No Game Available for Football" height="30vh" />
      ) : null}
    </div>
  );
}

export default Football;
