import { useNavigate } from "react-router-dom";
import milan from "../../assets/images/millan.svg";
import yellowcard from "../../assets/images/yellow.svg";
import balls from "../../assets/images/balls.svg";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import noLogo from "../../assets/images/no.jpg";
import { BsFillLightningFill } from "react-icons/bs";
import { PiSoccerBallBold } from "react-icons/pi";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    padding: 10,
    margin: "0px 0px 20px 0px",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    justifyContent: "space-between",
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0px 5px 0px",
  },
  box: {
    backgroundColor: COLORS.cream,
    width: "30%",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
  },
};

function GameDetailCardHeader(props: any) {
  const navigate = useNavigate();
  const { propStyle, data } = props;

  function isEmpty(value) {
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  const eventArray = isEmpty(data?.events)
    ? []
    : Array.isArray(data?.events?.event)
    ? data?.events?.event
    : [data?.events?.event];



  return (
    <div style={{ ...styles.container, ...propStyle }}>
      <div style={{ ...styles.row }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "0px 0px 10px 0px",
            }}
          >
            {data?.leagueName}
          </p>
          {!data?.localTeamLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.localTeamLogo} style={{ width: "20px" }} />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamName}
          </p>
        </div>
        <div>
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              padding: "2px 5px",
              backgroundColor: COLORS.red,
              textAlign: "center",
              borderRadius: 10,
              color: COLORS.white,
            }}
          >
            {data?.internalStatus}
          </p>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamGoals} - {data?.visitorTeamGoals}
          </h3>
          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {data?.status}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "0px 0px 10px 0px",
            }}
          >
            ID: {data?.id}
          </p>
          {!data?.visitorTeamLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={data?.visitorTeamLogo} style={{ width: "20px" }} />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeamName}
          </p>
        </div>
      </div>

      <div
        style={{
          height: 1,
          width: "100%",
          margin: "10px 0px",
          backgroundColor: COLORS.gray,
        }}
      />

      <div>
        {eventArray &&
          eventArray?.map((dd, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div style={{ width: "48%" }}>
                  {dd["@team"] === "localteam" ? (
                    <div style={{ display: "flex" }}>
                      {dd["@type"] === "subst" ? (
                        <div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p style={{ ...FONTS.body7, marginRight: 5 }}>
                              {dd["@player"]}
                            </p>
                            <FaArrowRightArrowLeft
                              size={10}
                              color={COLORS.orange}
                              style={{ marginRight: 10 }}
                            />
                            <p
                              style={{
                                ...FONTS.body7,
                                fontSize: 8,
                                marginRight: 5,
                              }}
                            >
                              {dd["@assist"]}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p style={{ ...FONTS.body7, marginRight: 5 }}>
                            {dd["@player"]}
                          </p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p
                              style={{
                                ...FONTS.body7,
                                fontSize: 8,
                                marginRight: 5,
                              }}
                            >
                              {dd["@assist"]}
                            </p>
                            {dd["@assist"] && (
                              <BsFillLightningFill
                                size={10}
                                style={{ marginRight: 10 }}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <p style={{ ...FONTS.body7, marginRight: 5 }}>
                        {dd["@minute"]}'
                      </p>
                    </div>
                  ) : null}
                </div>
                <div>
                  {dd["@type"] === "goal" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <PiSoccerBallBold color={COLORS.green} />
                    </div>
                  ) : dd["@type"] === "yellowcard" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <TbRectangleVerticalFilled color="#FFC15E" />
                    </div>
                  ) : dd["@type"] === "redcard" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <TbRectangleVerticalFilled color="red" />
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  {dd["@team"] === "visitorteam" ? (
                    <div style={{ display: "flex" }}>
                      <p style={{ ...FONTS.body7, marginRight: 5 }}>
                        {dd["@minute"]}'
                      </p>
                      {
                        dd["@type"] === "subst" ? (
                          <div>
                            <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
 <p style={{ ...FONTS.body7, marginRight: 5 }}>
                              {dd["@player"]}
                            </p>
                            <FaArrowRightArrowLeft
                              size={10}
                              color={COLORS.orange}
                              style={{ marginRight: 10 }}
                            />
                            <p
                              style={{
                                ...FONTS.body7,
                                fontSize: 8,
                                marginRight: 5,
                              }}
                            >
                              {dd["@assist"]}
                            </p>
                            </div>
                          </div>
                        )
                        :
                        (
                          <div>
                          <p style={{ ...FONTS.body7, marginRight: 5 }}>
                            {dd["@player"]}
                          </p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p
                              style={{
                                ...FONTS.body7,
                                fontSize: 8,
                                marginRight: 5,
                              }}
                            >
                              {dd["@assist"]}
                            </p>
                            {dd["@assist"] && (
                              <BsFillLightningFill
                                size={10}
                                style={{ marginRight: 10 }}
                              />
                            )}
                          </div>
                        </div>
                        )
                      }
        
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GameDetailCardHeader;
