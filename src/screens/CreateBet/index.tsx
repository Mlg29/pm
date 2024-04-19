import React from "react";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import { COLORS } from "../../utils/colors";
import { FlexDirection } from "../../utils/type";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";


const styles = {
  contain: {
    padding: 15,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "10px 0px 20px 0px",
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
  rowBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    marginBottom: 20,
    padding: "15px 20px",
    borderRadius: 15
  }
};

function CreateBet() {
  const navigate = useNavigate();
  return (
    <div className="top-container" style={{ backgroundColor: "white" }}>
      <Header text="Create Bet" />

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

      <div>
        <h3 style={{ ...FONTS.h6 }}>Bet Option</h3>
        <p style={{ ...FONTS.body7, marginBottom: 20 }}>Select the option that best suit you</p>
      </div>

      <div style={{ ...styles.rowBtn }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
         // onClick={() => navigate("/wallet-pin")}
        >
          <div>
            <IoIosPeople
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Invite Friends</h3>
            <p style={{ ...FONTS.body7 }}>Create a bet invite</p>
          </div>
        </div>
        <FaChevronRight />
      </div>

      <div style={{ ...styles.rowBtn }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          //onClick={() => navigate("/wallet-pin")}
        >
          <div>
          <RiFileList3Fill
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Open Bet</h3>
            <p style={{ ...FONTS.body7 }}>Creat bet in the bet market</p>
          </div>
        </div>
        <FaChevronRight />
      </div>
    </div>
  );
}

export default CreateBet;
