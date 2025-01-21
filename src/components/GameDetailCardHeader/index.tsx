import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import noLogo from "../../assets/images/no.jpg";
import { useEffect } from "react";


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

function GameDetailCardHeader(props: any) {
  const navigate = useNavigate();
  const { propStyle, data } = props;


  // useEffect(() => {
  //   const fetchTeamData = async () => {
  //     const url = "http://data2.goalserve.com:8084/api/v1/logotips/soccer/teams?k=31a4b27821b744ba159608dc5f051e20&ids=21730";

  //     try {
  //       const response = await fetch(url, {
  //         method: 'GET',
  //         mode: 'no-cors' // This tells the browser to bypass CORS restrictions
  //       });
  //       // With 'no-cors', you won't be able to access the response body, but you can fetch the resource.
  //       console.log(response);
  //     } catch (err) {
  //       console.error("Failed to fetch data", err);
  //     }
  //   };

  //   fetchTeamData();
  // }, []);


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
          <img src={`data:image/png;base64,${data?.localTeam?.teamLogo}`} alt="Logo" />
          {!data?.localTeam?.teamLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.localTeam?.teamLogo} style={{ width: "20px" }} />
          )}
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
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              padding: "2px 5px",
              backgroundColor: COLORS.red,
              textAlign: "center",
              borderRadius: 10,
              color: COLORS.white,
            }}
          >
            {data?.status}
          </p>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeam?.goals} - {data?.visitorTeam?.goals}
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
          {!data?.visitorTeam?.teamLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.visitorTeam?.teamLogo} style={{ width: "20px" }} />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeam?.name}
          </p>
        </div>
      </div>

    </div>
  );
}

export default GameDetailCardHeader;
