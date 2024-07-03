import React from 'react'
import { FONTS } from '../../utils/fonts';
import { COLORS } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import GameCard from '../../components/GameCard';

function Football({live, upcoming, today, tomorrow}) {
    const navigate = useNavigate()
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
