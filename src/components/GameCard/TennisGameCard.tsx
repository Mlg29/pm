import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import noLogo from "../../assets/images/no.jpg";
import { useNavigate } from "react-router-dom";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

// export const styles = {
//     container: {
//         border: `1px solid ${COLORS.semiGray}`,
//         borderRadius: 10,
//         padding: 10,
//         margin: "0px 0px 20px 0px"
//     },
//     row: {
//         display: "flex",
//         flexDirection: "row" as FlexDirection,
//         alignItems: "center",
//         justifyContent: "space-between",

//     },
//     row2: {
//         display: "flex",
//         flexDirection: "row" as FlexDirection,
//         justifyContent: "space-between",
//         alignItems: "center",
//         margin: "20px 0px 5px 0px"
//     },
//     box: {
//         backgroundColor: COLORS.cream,
//         width: "45%",
//         padding: 5,
//         display: "flex",
//         justifyContent: "center",
//         fontSize: "8px",
//         fontWeight: 600
//     }
// }

export const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    cursor: "pointer",
    paddingBottom: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  box1: {
    marginRight: 20,
    width: "10%",
  },
  box2: {
    marginRight: 10,
    width: "55%",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    width: "15%",
  },
  box4: {
    marginRight: 10,
    width: "20%",
  },
};

function TennisGameCard({ id, data }) {
  const navigate = useNavigate();


  return (
    <div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 5}}> 
        <p style={{ ...FONTS.body7, color: COLORS.black, marginRight: 10 }}>
          {data?.tournamentName}
        </p>
        <p style={{ ...FONTS.body8, color: COLORS.black }}>
         ( {moment(data?.startTime).format("DD-MM-YYYY")})
        </p>
      </div>

       <div
      style={styles.container}
      key={id}
      onClick={() =>
        navigate("/game-details", { state: { data: data, gameType: "Tennis" } })
      }
    >
      <div style={styles.box1}>
        <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
          {data?.status > 0 ? `${data?.status}'` : data?.status}
        </p>
      </div>
      <div style={styles.box2}>
        <p style={{ ...FONTS.body7 }}>{data?.player[0]["@name"]}</p>
        <p style={{ ...FONTS.body7 }}>{data?.player[1]["@name"]}</p>
      </div>
      <div style={styles.box3}>
        <GiSoccerField />
        <div style={{ marginLeft: 10 }}>
          {data?.player?.map((dd, i) => {
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                
                <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
                  {dd["@totalscore"]}
                </p>

              </div>
            );
          })}

        </div>
      </div>
      <div style={styles.box4}>
        <p style={{ ...FONTS.body7, textAlign: "center", color: COLORS.green }}>
          {data?.player[0]["@name"]?.slice(0, 4)} Win
        </p>
        <p style={{ ...FONTS.body7, textAlign: "center", color: COLORS.green }}>
          {data?.player[1]["@name"]?.slice(0, 4)} Win
        </p>
      </div>
    </div>
    </div>
   
  );
}

export default TennisGameCard;
