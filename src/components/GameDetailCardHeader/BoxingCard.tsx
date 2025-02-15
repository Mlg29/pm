import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { GiBoxingGlove } from "react-icons/gi";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    padding: 10,
    margin: "0px 0px 20px 0px",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    justifyContent: "space-between",
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0px 5px 0px",
  },
  box: {
    backgroundColor: COLORS.cream,
    width: "30%",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
  },
};

function BoxingCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;

  function isEmpty(value) {
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) return false;
    }
    return true;
  }


  return (
    <div style={{ ...styles.container, ...propStyle }}>
      <div style={{ ...styles.row }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "0px 0px 10px 0px",
            }}
          >
            {data?.name}
          </p>
          <GiBoxingGlove size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeam?.name}
          </p>
        </div>
        <div>
          {
            data?.localTeam?.winner === "True" || data?.awayTeam?.winner === "True" ?
              <h3
                style={{
                  ...FONTS.h7,
                  textAlign: "center",
                  margin: "10px 0px 0px 0px",
                  color: COLORS.green
                }}
              >
                Winner: {data?.localTeam?.winner === "True" ? `${data?.localTeam?.name} (round ${data?.localTeam?.round})` : data?.awayTeam?.winner === "True" ? `${data?.awayTeam?.name} (round ${data?.awayTeam?.round})` : null}
              </h3>
              : null
          }


          <p style={{ ...FONTS.body7, fontWeight: '600', marginTop: 5, fontSize: "8px", textAlign: "center" }}>
            {data?.status}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >

          <GiBoxingGlove size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.awayTeam?.name}
          </p>
        </div>
      </div>
      {/* <div
        style={{
          height: 1,
          width: "100%",
          margin: "10px 0px",
          backgroundColor: COLORS.gray,
        }}
      /> */}

    </div>
  );
}

export default BoxingCard;
