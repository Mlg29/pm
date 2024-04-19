import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import { useNavigate } from "react-router-dom";
import user from "../../assets/images/user.svg";
import notification from "../../assets/images/notification.svg";
import Button from "../../components/Button";

const styles = {
  contain: {
    padding: 15,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "10px 0px 20px 0px",
  },
  div: {
    border: `1px solid ${COLORS.semiGray}`,
    padding: 10,
  },
  cardDiv: {
    padding: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
  },
};

const ChallengeDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="top-container">
      <Header text="Challenge Details" />

      <div>
        {[""]?.map((data, i) => {
          return (
            <div key={i} style={{ ...styles.contain }}>
              <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                UEFA - Champions League
              </p>

              <div style={{ ...styles.row }}>
                <div style={{ ...styles.center }}>
                  <img src={milan} />
                  <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>Milan</h3>
                  <p style={{ ...FONTS.body7 }}>(You)</p>
                </div>
                <div style={{ ...styles.center }}>
                  <p style={{ ...FONTS.body7, marginTop: "10px" }}>10:15 PM</p>
                  <h3 style={{ ...FONTS.h6, marginTop: "5px" }}>₦ 10,000</h3>
                </div>
                <div style={{ ...styles.center }}>
                  <img src={roma} />
                  <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>AS Roma</h3>
                  <p style={{ ...FONTS.body7 }}>Unknown</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ ...styles.div }}>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Bet ID</p>
          <h3 style={{ ...FONTS.h6 }}>98dG12UB</h3>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Date & Time</p>
          <h3 style={{ ...FONTS.h6 }}>01 Feb, 2024 10:39 PM</h3>
        </div>{" "}
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Adjusted Stake</p>
          <h3 style={{ ...FONTS.h6 }}>₦ 20,000</h3>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Opponent</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ ...styles.row }}>
              <img src={user} width={20} />
              <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>
                @JohnDdon
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ width: "100%", margin: "2rem 0px" }}>
          <Button
            text="Accept Challenge"
            propStyle={{ width: "100%" }}
            handlePress={() => navigate("/options")}
          />
          <div style={{marginTop: 10}} />
           <Button
            text="Adjust Stake"
            propStyle={{ width: "100%", backgroundColor: COLORS.cream, color: COLORS.primary }}
            handlePress={() => navigate("/adjust-bet")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
