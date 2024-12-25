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
    width: "25%",
  },
  box2: {
    marginRight: 10,
    width: "75%",
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
        <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
          ({data?.formatted_date} - {data?.time})
        </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localTeam}</p>
          <p style={{ ...FONTS.body7 }}>{data?.visitorTeam}</p>
        </div>
        <div style={styles.box3}>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.localGoals}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.visitorGoals}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
