import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import user from "../../assets/images/user.svg";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import { FaUserCircle } from "react-icons/fa";
import { FlexDirection } from "../../utils/type";

const styles = {
  container: {
    borderRadius: 10,
    border: `1px solid ${COLORS.gray}`,
    padding: 10,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "space-between",
    margin: "0px 0px 20px 0px",
  },
  container2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px",
  },
  rowBtw: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function SlipCard(props: any) {
  const {
    amount,
    homeImage,
    awayImage,
    homeScore,
    awayScore,
    homeName,
    awayName,
    isWin,
    isUser,
    betCurrency,
    data,
  } = props;
  const navigate = useNavigate();


  return (
    <div
    style={{ ...styles.container, cursor: "pointer" }}
      onClick={() =>
        navigate(`/bet-detail?${data?.id}`, {
          state: { betInfo: data?.id },
        })
      }
    >
      <div style={{ ...styles.container2, cursor: "pointer" }}>
        <div>
          <div style={{ ...styles.row }}>
            <img src={homeImage} width={20} />
            <h3
              style={{ ...FONTS.body7, width: 150, margin: "0px 0px 0px 5px" }}
            >
              {homeName}
            </h3>
            <h3 style={{ ...FONTS.h6, textAlign: "center" }}>
              {homeScore ? homeScore : "-"}
            </h3>
          </div>
          <div style={{ ...styles.row }}>
            <img src={awayImage} width={20} />
            <h3
              style={{ ...FONTS.body7, width: 150, margin: "0px 0px 0px 5px" }}
            >
              {awayName}
            </h3>
            <h3 style={{ ...FONTS.h6, textAlign: "center" }}>
              {(awayScore || awayScore === 0) ? awayScore : "-"}
            </h3>
          </div>
        </div>
        <h3
          style={{
            ...FONTS.h5,
            color:
              isWin === isUser?._id
                ? COLORS.green
                : !isWin
                ? COLORS.gray
                : COLORS.red,
          }}
        >
          {isWin === isUser?._id ? "+" : !isWin ? "" : "-"}
          {betCurrency === "NGN" ? "₦" : "$"} {formatCurrency(amount)}
        </h3>
      </div>

      <div>
        {isUser ? (
          <div style={{ ...styles.rowBtw }}>
            <div style={{ ...styles.row }}>
              {isUser?.profileImage ? (
                <img
                  src={isUser?.profileImage}
                  style={{ width: 20, height: 20, borderRadius: 20 }}
                />
              ) : (
                <FaUserCircle />
              )}

              <h3 style={{ ...FONTS.h7, margin: "0px 0px 0px 5px" }}>
                @{isUser?.userName}
              </h3>
            </div>
            <div>
              <p style={{ ...FONTS.h7, margin: "0px 0px 0px 5px" }}>Your Prediction</p>
              <p style={{ ...FONTS.h7, margin: "0px 0px 0px 5px", textAlign: 'end' }}>{data?.prediction === "W1" ? "Home Win" : data?.prediction === "W2" ? "Away Win" : "DRAW" }</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SlipCard;
