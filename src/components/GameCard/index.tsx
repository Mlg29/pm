import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

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
    width: "20%",
  },
  box2: {
    marginRight: 10,
    width: "80%",
  },
  box3: {
    display: "flex",
    justifyContent: 'flex-end',
    alignItems: "center",
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
    <div>
      <div
        style={styles.container}
        key={id}
        onClick={() =>
          navigate("/game-details", {
            state: { data: data, gameType: "Soccer" },
          })
        }
      >
        <div style={styles.box1}>
        <p style={{ ...FONTS.body8, color: COLORS.black }}>
          ( {moment(data?.startTime).format("DD-MM-YYYY")})
        </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status > 0 ? `${data?.status}'` : data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localTeamName}</p>
          <p style={{ ...FONTS.body7 }}>{data?.visitorTeamName}</p>
        </div>
        <div style={styles.box3}>
          {/* <GiSoccerField /> */}
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.localTeamGoals}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.visitorTeamGoals}
            </p>
          </div>
        </div>
        {/* <div style={styles.box4}>
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
        </div> */}
      </div>
    </div>
  );
}

export default GameCard;
