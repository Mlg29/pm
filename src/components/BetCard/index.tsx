import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AcceptModal from "../Modals/AcceptModal";
import AdjustModal from "../Modals/AdjustModal";

const styles = {
  contain: {
    padding: 10,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "1px",
    width: "100%",
    marginBottom: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
  },
};

const BetCard = () => {
  const navigate = useNavigate();

  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  return (
    <>
      <div style={{ ...styles.contain }}>
        <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
          UEFA - Champions League
        </p>

        <div style={{ ...styles.row }}>
          <div style={{ ...styles.center }}>
            <img src={milan} />
            <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>Milan</h3>
          </div>
          <div style={{ ...styles.center }}>
            <p style={{ ...FONTS.body7, marginTop: "10px" }}>10:15 PM</p>
            <h3 style={{ ...FONTS.h6, marginTop: "5px" }}>₦ 10,000</h3>
          </div>
          <div style={{ ...styles.center }}>
            <img src={roma} />
            <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>AS Roma</h3>
          </div>
        </div>

        <div style={{ ...styles.row, paddingBottom: "1rem" }}>
          <div>
            <p style={{ ...FONTS.body7, marginTop: "10px" }}>@JohnDdon</p>
            <p style={{ ...FONTS.body7 }}>Milan Win</p>
          </div>
          <div>
            <p
              style={{ ...FONTS.body7, marginTop: "10px", textAlign: "right" }}
            >
              You
            </p>
            <p style={{ ...FONTS.body7 }}>Draw</p>
          </div>
        </div>

        <div style={{ ...styles.row, paddingBottom: "0rem", border: "none" }}>
          <div
            style={{
              backgroundColor: COLORS.primary,
              width: "48%",
              padding: 10,
              borderRadius: 10,
            }}
            onClick={() => setAccept(true)}
          >
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.white,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Accept Bet
            </p>
          </div>
          <div
            style={{
              backgroundColor: COLORS.cream,
              width: "48%",
              padding: 10,
              borderRadius: 10,
            }}
            onClick={() => setReject(true)}
          >
            <p
              style={{
                ...FONTS.h7,
                color: COLORS.primary,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Adjust Bet
            </p>
          </div>
        </div>
      </div>

      <AcceptModal 
        show={accept}
        handleClose={() => setAccept(false)}
      />


<AdjustModal 
        show={reject}
        handleClose={() => setReject(false)}
      />
    </>
  );
};

export default BetCard;
