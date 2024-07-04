import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GiSoccerField } from "react-icons/gi";

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
//         width: "30%",
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
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    width: "15%",
  },
  box4: {
    marginRight: 10,
    width: "20%",
  },
};

function GameCard({ data, id }) {
  const navigate = useNavigate();


  return (
    // <div key={id} style={{...styles.container, cursor: "pointer"}} onClick={() => navigate("/game-details", {state: {data: data, gameType: "Soccer"}})}>
    //     <div style={{...styles.row}}>
    //         <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "40%"}}>
    //             <p style={{...FONTS.body7, fontSize: "8px", margin: "0px 0px 10px 0px"}}>{data?.leagueName}</p>

    //             {
    //             !data?.localTeamLogo ? <img src={noLogo} style={{width: '30px'}} /> : <img src={data?.localTeamLogo} style={{width: '20px'}} />
    //            }
    //             <p style={{...FONTS.body7,fontSize: "8px", margin: "10px 0px 0px 0px"}}>{data?.localTeamName}</p>
    //         </div>
    //         <div>
    //             <p style={{...FONTS.body7,fontSize: "8px",padding: "2px 5px", backgroundColor: COLORS.red, textAlign: 'center', borderRadius: 10, color: COLORS.white}}>{data?.internalStatus}</p>
    //             <h3 style={{...FONTS.h5,textAlign: "center", margin: "10px 0px 0px 0px"}}>{data?.localTeamGoals} - {data?.visitorTeamGoals}</h3>
    //             <p style={{...FONTS.body7,fontSize: "8px", textAlign: 'center'}}>{data?.status}</p>
    //         </div>
    //         <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "40%"}}>
    //             <p style={{...FONTS.body7, fontSize: "8px", margin: "0px 0px 10px 0px"}}>ID: {data?.id}</p>
    //            {
    //             !data?.visitorTeamLogo ? <img src={noLogo} style={{width: '30px'}} /> : <img src={data?.visitorTeamLogo} style={{width: '20px'}} />
    //            }

    //             <p style={{...FONTS.body7, fontSize: "8px", margin: "10px 0px 0px 0px"}}>{data?.visitorTeamName}</p>
    //         </div>

    //     </div>

    //     <div style={{...styles.row2}}>
    //         <div style={{...styles.box}}>{data?.localTeamName} Win</div>
    //         <div style={{...styles.box}}>Draw</div>
    //         <div style={{...styles.box}}>{data?.visitorTeamName} Win</div>
    //     </div>

    // </div>
    <div style={styles.container}  key={id}  onClick={() => navigate("/game-details", {state: {data: data, gameType: "Soccer"}})}>
      <div style={styles.box1}>
        <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>{data?.status > 0 ? `${data?.status}'` : data?.status}</p>
      </div>
      <div style={styles.box2}>
        <p style={{ ...FONTS.body7 }}>{data?.localTeamName}</p>
        <p style={{ ...FONTS.body7 }}>{data?.visitorTeamName}</p>
      </div>
      <div style={styles.box3}>
      <GiSoccerField />
      <div style={{marginLeft: 10}}>
         <p style={{ ...FONTS.body7,color: COLORS.dimRed }}>{data?.localTeamGoals}</p>
        <p style={{ ...FONTS.body7,color: COLORS.dimRed }}>{data?.visitorTeamGoals}</p>
      </div>
       
      </div>
      <div style={styles.box4}>
          <p
            style={{ ...FONTS.body7, textAlign: "center", color: COLORS.green }}
          >
            {data?.localTeamName?.slice(0, 4)} Win
          </p>
          <p
            style={{
              ...FONTS.body7,
              textAlign: "center",
              color: COLORS.orange,
            }}
          >
            Draw
          </p>
          <p
            style={{ ...FONTS.body7, textAlign: "center", color: COLORS.green }}
          >
            {data?.visitorTeamName?.slice(0, 4)} Win
          </p>
      </div>
    </div>
  );
}

export default GameCard;
