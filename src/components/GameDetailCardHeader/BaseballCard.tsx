import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { FaBaseball } from "react-icons/fa6";
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

function BaseballCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;

  //   function isEmpty(value) {
  //     for (let prop in value) {
  //       if (value.hasOwnProperty(prop)) return false;
  //     }
  //     return true;
  //   }

  //   const eventArray = isEmpty(data?.player)
  //     ? []
  //     : Array.isArray(data?.player)
  //     ? data?.player
  //     : [data?.player];


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
            {data?.league}
          </p>
          <FaBaseball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeam?.["@name"]}
          </p>
        </div>
        <div>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
              color: COLORS.dimRed
            }}
          >
            {data?.localTeam?.["@totalscore"]} - {data?.awayTeam?.["@totalscore"]}
          </h3>
          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {data?.["@status"]}
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

          <FaBaseball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.awayTeam?.["@name"]}
          </p>
        </div>
      </div>
      <div
        style={{
          height: 1,
          width: "100%",
          margin: "10px 0px",
          backgroundColor: COLORS.gray,
        }}
      />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{data?.localTeam?.["@name"]}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in1"] ? data?.localTeam?.["@in1"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in2"] ? data?.localTeam?.["@in2"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in3"] ? data?.localTeam?.["@in3"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in4"] ? data?.localTeam?.["@in4"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in5"] ? data?.localTeam?.["@in5"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in6"] ? data?.localTeam?.["@in6"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in7"] ? data?.localTeam?.["@in7"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in8"] ? data?.localTeam?.["@in8"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.["@in9"] ? data?.localTeam?.["@in9"] : "-"}</p>
            <p style={{ margin: "0px 5px", color: 'red' }}>{data?.localTeam?.["@totalscore"] ? data?.localTeam?.["@totalscore"] : "-"}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <p>{data?.awayTeam?.["@name"]}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in1"] ? data?.awayTeam?.["@in1"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in2"] ? data?.awayTeam?.["@in2"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in3"] ? data?.awayTeam?.["@in3"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in4"] ? data?.awayTeam?.["@in4"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in5"] ? data?.awayTeam?.["@in5"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in6"] ? data?.awayTeam?.["@in6"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in7"] ? data?.awayTeam?.["@in7"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in8"] ? data?.awayTeam?.["@in8"] : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.["@in9"] ? data?.awayTeam?.["@in9"] : "-"}</p>
            <p style={{ margin: "0px 5px", color: 'red' }}>{data?.awayTeam?.["@totalscore"] ? data?.awayTeam?.["@totalscore"] : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseballCard;
