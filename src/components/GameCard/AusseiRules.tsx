import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

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

function AussieRulesGameCard({ data, id }) {
  const navigate = useNavigate();



  return (
    <div>
      <div
        style={styles.container}
        key={id}
        onClick={() =>
          navigate("/game-details", {
            state: { data: data, gameType: "AussieRules" },
          })
        }
      >
        <div style={styles.box1}>
          <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
            ({data?.match?.formatted_date || data?.match?.date} - {data?.match?.time})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.match?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.match?.localteam?.name}</p>
          <p style={{ ...FONTS.body7 }}>{data?.match?.visitorteam?.name}</p>
        </div>
        <div style={styles.box3}>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.match?.localteam?.goals}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.match?.visitorteam?.goals}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AussieRulesGameCard;
