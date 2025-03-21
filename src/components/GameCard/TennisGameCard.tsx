import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import noLogo from "../../assets/images/no.jpg";
import { useNavigate } from "react-router-dom";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";
import { convertToUserTime } from "../../utils/helper";

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

function TennisGameCard({ id, data }) {
  const navigate = useNavigate();

  const utcDate = new Date(data?.datetimeUtc);
  const localTime = convertToUserTime(data?.date, data?.time)

  return (
    <div>


      <div
        style={styles.container}
        key={id}
        onClick={() =>
          navigate("/game-details", { state: { data: data, gameType: "Tennis" } })
        }
      >
        <div style={styles.box1}>
          <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
            ({localTime})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.player && data?.player[0]?.name}</p>
          <p style={{ ...FONTS.body7 }}>{data?.player && data?.player[1]?.name}</p>
        </div>
        <div style={styles.box3}>
          <div style={{ marginLeft: 10 }}>
            {data?.player?.map((dd, i) => {
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ ...FONTS.body7, color: COLORS.gray, margin: '0px 5px' }}>
                    {dd?.s5}
                  </p>
                  <p style={{ ...FONTS.body7, color: COLORS.gray, margin: '0px 5px' }}>
                    {dd?.s4}
                  </p>
                  <p style={{ ...FONTS.body7, color: COLORS.gray, margin: '0px 5px' }}>
                    {dd?.s3}
                  </p>
                  <p style={{ ...FONTS.body7, color: COLORS.gray, margin: '0px 5px' }}>
                    {dd?.s2}
                  </p>
                  <p style={{ ...FONTS.body7, color: COLORS.gray, margin: '0px 5px' }}>
                    {dd?.s1}
                  </p>
                  <p style={{ ...FONTS.body7, color: COLORS.dimRed, margin: '0px 5px' }}>
                    {dd?.totalscore}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>


  );
}

export default TennisGameCard;
