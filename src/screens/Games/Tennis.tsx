import React from "react";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import TennisGameCard from "../../components/GameCard/TennisGameCard";

function Tennis({ live, upcoming }) {
  const navigate = useNavigate();
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
      {live?.data?.map((aa: any, i: any) => {
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
    </div>
  );
}

export default Tennis;
