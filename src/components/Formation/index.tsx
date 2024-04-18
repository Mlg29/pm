import React from "react";

import SoccerLineUp from "react-soccer-lineup";
import { FlexDirection } from "../../utils/type";
import Team from "react-soccer-lineup";

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
    rotate: "90deg",
    marginTop: "6rem",
    marginBottom: "6rem"
    // marginTop: "2rem",
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
          numberColor: '10',
        }
      ],
      fw: [
        {
          number: 2,
          color: "#FDDC02",
          numberColor: '10',
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
          numberColor: '10',
        }
      ],
      fw: [
        {
          number: 2,
          color: "#4285F4",
          numberColor: '10',
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
      <SoccerLineUp
        size={"responsive"}
        color={"lightseagreen"}
        pattern={"lines"}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    </div>
  );
};

export default Formation;
