import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";
import { convertToPST } from "../../utils/helper";

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

function GameCard({ data, id, sportStatus }) {
  const navigate = useNavigate();

  const utcDate = new Date(data?.datetimeUtc);
  const localTime = utcDate.toLocaleTimeString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });


  // const localTime2 = convertToPST(data?.datetimeUtc)


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
            ({data?.formattedDate} - {localTime})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {sportStatus === "Scheduled" ? "Not Started" : data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localTeam?.name}</p>
          <p style={{ ...FONTS.body7 }}>{data?.visitorTeam?.name}</p>
        </div>
        <div style={styles.box3}>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.localTeam?.goals ? data?.localTeam?.goals : "-"}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.green }}>
              {data?.visitorTeam?.goals ? data?.visitorTeam?.goals : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
