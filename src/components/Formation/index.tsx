import React from "react";

import SoccerLineUp from "react-soccer-lineup";
import { FlexDirection } from "../../utils/type";
import Team from "react-soccer-lineup";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import { FONTS } from "../../utils/fonts";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftHalf: {
    marginRight: 20,
  },
  rightHalf: {
    marginLeft: 20,
  },
  rotate: {
    //rotate: "90deg",
    // marginTop: "6rem",
    //  marginBottom: "6rem",
    // marginTop: "2rem",
  },
  info: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    // alignItems: "center",
    padding: 10,
  },
};

const Formation = () => {
  const homeTeam = {
    squad: {
      gk: {
        // name: "Ola",
        number: 1,
        color: "#FDDC02",
        numberColor: "10",
      },
      df: [
        {
          number: 2,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 29,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 6,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 3,
          color: "#FDDC02",
          numberColor: "10",
        },
      ],
      cdm: [
        {
          number: 4,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 8,
          color: "#FDDC02",
          numberColor: "10",
        },
      ],
      cam: [
        {
          number: 11,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 7,
          color: "#FDDC02",
          numberColor: "10",
        },
        {
          number: 29,
          color: "#FDDC02",
          numberColor: "10",
        },
      ],
      fw: [
        {
          number: 2,
          color: "#FDDC02",
          numberColor: "10",
        },
      ],
      style: {
        color: "red",
        numberColor: "blue",
      },
    },
  };

  const awayTeam = {
    squad: {
      gk: {
        // name: "Ola",
        number: 1,
        color: "#4285F4",
        numberColor: "10",
      },
      df: [
        {
          number: 2,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 6,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 3,
          color: "#4285F4",
          numberColor: "10",
        },
      ],
      cdm: [
        {
          number: 4,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 8,
          color: "#4285F4",
          numberColor: "10",
        },
      ],
      cam: [
        {
          number: 11,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 7,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 10,
          color: "#4285F4",
          numberColor: "10",
        },
        {
          number: 29,
          color: "#4285F4",
          numberColor: "10",
        },
      ],
      fw: [
        {
          number: 2,
          color: "#4285F4",
          numberColor: "10",
        },
      ],
      style: {
        color: "red",
        numberColor: "blue",
      },
    },
  };

  return (
    <div style={{ ...styles.rotate }}>
      <div style={{ ...styles.info }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={milan} />
            <p style={{ ...FONTS.body6 }}>Milan</p>
          </div>
          <h3 style={{ ...FONTS.body7, marginLeft: 10, marginTop: 5 }}>
            M. Arteta
          </h3>
        </div>
        <p style={{ ...FONTS.body6 }}>4-2-3-1</p>
      </div>
      <SoccerLineUp
        size={"responsive"}
        color={"#588f58"}
        pattern={"lines"}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <div style={{ ...styles.info }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={roma} />
            <p style={{ ...FONTS.body6 }}>Roma</p>
          </div>
          <h3 style={{ ...FONTS.body7, marginLeft: 10, marginTop: 5 }}>
            M. Arteta
          </h3>
        </div>
        <p style={{ ...FONTS.body6 }}>3-2-4-1</p>
      </div>

      <div style={{backgroundColor: "white"}}>
        <p style={{ ...FONTS.body5,textAlign: "center", marginTop: 5 }}>SUBSTITUTES</p>
          <div>
            {
              ["","","","","","",""]?.map(dd => {
                return (
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <p style={{ ...FONTS.body7, marginRight: 5}}>32</p>
                      <p style={{ ...FONTS.body7, marginRight: 5 }}>John Tijani</p>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <p style={{ ...FONTS.body7, marginRight: 5}}>32</p>
                      <p style={{ ...FONTS.body7,marginRight: 5 }}>John Tijani</p>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
     
      </div>
    </div>
  );
};

export default Formation;
