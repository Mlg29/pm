import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import user from "../../assets/images/user.svg";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import { FaUserCircle } from "react-icons/fa";
import { FlexDirection } from "../../utils/type";
import noLogo from "../../assets/images/no.jpg";

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
    multipleEntry,
    awayScore,
    homeName,
    awayName,
    isWin,
    isUser,
    betCurrency,
    data,
  } = props;
  const navigate = useNavigate();

  const getPrediction = (prediction: string) => {
    const result = data?.sportEvent?.HorseEvent?.horses?.horse
      .filter((item, i) => prediction === `W${i + 1}`)
      .map((horse, i) => {
        return `${horse?.name} WIN`;
      });

    return result;
  };


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
        {multipleEntry ? (
          <div>
            <p style={{
                  ...FONTS.body7,
                }}>A multiple entry bet</p>
          </div>
        ) : (
          <div>
            <div style={{ ...styles.row }}>
              <h3
                style={{
                  ...FONTS.body7,
                  width: 150,
                  margin: "0px 0px 0px 5px",
                }}
              >
                {homeName}
              </h3>
              <h3 style={{ ...FONTS.h6, textAlign: "center" }}>
                {homeScore || homeScore === 0 ? homeScore : "-"}
              </h3>
            </div>
            <div style={{ ...styles.row }}>
              <h3
                style={{
                  ...FONTS.body7,
                  width: 150,
                  margin: "0px 0px 0px 5px",
                }}
              >
                {awayName}
              </h3>
              <h3 style={{ ...FONTS.h6, textAlign: "center" }}>
                {awayScore || awayScore === 0 ? awayScore : "-"}
              </h3>
            </div>
          </div>
        )}

        <div>
          <h3
            style={{
              ...FONTS.h5,
              color:
                isWin === isUser?.id
                  ? COLORS.green
                  : !isWin
                  ? COLORS.gray
                  : COLORS.red,
            }}
          >
            {isWin === isUser?.id ? "+" : !isWin ? "" : "-"}
            {betCurrency === "NGN" ? "₦" : "$"} {formatCurrency(amount)}
          </h3>
          <h3></h3>
        </div>
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
              <p style={{ ...FONTS.h7, margin: "0px 0px 0px 5px", textAlign: 'right' }}>
                Your Prediction
              </p>
              {multipleEntry ? (
                <p  style={{
                  ...FONTS.h7,
                  margin: "0px 0px 0px 5px",
                  textAlign: "right",
                  color: COLORS.orange
                }}>{getPrediction(data?.prediction)}</p>
              ) : (
                <p
                  style={{
                    ...FONTS.h7,
                    margin: "0px 0px 0px 5px",
                    textAlign: "right",
                    color: COLORS.orange
                  }}
                >
                  {data?.prediction === "W1"
                    ? `${homeName} Win`
                    : data?.prediction === "W2"
                    ? `${awayName} Win`
                    : "DRAW"}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SlipCard;
