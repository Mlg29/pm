import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";

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

function TennisCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;

  function isEmpty(value) {
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  const eventArray = isEmpty(data?.player)
    ? []
    : Array.isArray(data?.player)
    ? data?.player
    : [data?.player];


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
            {data?.tournamentName}
          </p>
          {!data?.player1Url ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.player1Url} style={{ width: "20px" }} />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.player[0]["@name"]}
          </p>
        </div>
        <div>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.player[0]["@totalscore"]} - {data?.player[1]["@totalscore"]}
          </h3>
          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
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
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "0px 0px 10px 0px",
            }}
          >
            ID: {data?.id}
          </p>
          {!data?.player2Url ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.player2Url} style={{ width: "20px" }} />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.player[1]["@name"]}
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
        {eventArray &&
          eventArray?.map((dd, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <p>{dd["@name"]} </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p style={{margin: "0px 5px"}}>{dd["@s1"] ? dd["@s1"] : 0} </p>
                  <p style={{margin: "0px 5px"}}>{dd["@s2"] ? dd["@s2"] : 0} </p>
                  <p style={{margin: "0px 5px"}}>{dd["@s3"] ? dd["@s3"] : 0} </p>
                  <p style={{margin: "0px 5px"}}>{dd["@s4"] ? dd["@s4"] : 0} </p>
                  <p style={{margin: "0px 5px"}}>{dd["@s5"] ? dd["@s5"] : 0} </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TennisCard;