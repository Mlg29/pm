import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { FaBasketball } from "react-icons/fa6";
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

function BasketballCard(props) {
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
            {data?.leagueName}
          </p>
          <FaBasketball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamName}
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
            {data?.localTeamScores?.total} - {data?.visitorTeamScores?.total}
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
          <FaBasketball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeamName}
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
        <div style={{display: 'flex',justifyContent:'space-between'}}>
            <p>{data?.localTeamName}</p>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <p style={{margin: "0px 5px"}}>{data?.localTeamScores?.ot}</p>
                <p style={{margin: "0px 5px"}}>{data?.localTeamScores?.q1}</p>
                <p style={{margin: "0px 5px"}}>{data?.localTeamScores?.q2}</p>
                <p style={{margin: "0px 5px"}}>{data?.localTeamScores?.q3}</p>
                <p style={{margin: "0px 5px"}}>{data?.localTeamScores?.q4}</p>
                <p style={{margin: "0px 5px", color: 'red'}}>{data?.localTeamScores?.total}</p>
            </div>
        </div>
        <div style={{display: 'flex',justifyContent:'space-between', marginTop: 5}}>
            <p>{data?.visitorTeamName}</p>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <p style={{margin: "0px 5px"}}>{data?.visitorTeamScores?.ot}</p>
                <p style={{margin: "0px 5px"}}>{data?.visitorTeamScores?.q1}</p>
                <p style={{margin: "0px 5px"}}>{data?.visitorTeamScores?.q2}</p>
                <p style={{margin: "0px 5px"}}>{data?.visitorTeamScores?.q3}</p>
                <p style={{margin: "0px 5px"}}>{data?.visitorTeamScores?.q4}</p>
                <p style={{margin: "0px 5px", color: 'red'}}>{data?.visitorTeamScores?.total}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default BasketballCard;
