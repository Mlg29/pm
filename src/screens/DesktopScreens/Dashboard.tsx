import GameCard from "../../components/GameCard";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import DashboardLayout from "./Components/DashboardLayout";
import NavHeader from "./Components/NavHeader";
import slider from "../../assets/images/slider.svg";
import { useEffect, useState } from "react";
import slider2 from "../../assets/images/slider2.svg";
import slider3 from "../../assets/images/slider3.svg";

const styles = {
  container: {
    background: COLORS.semiGray,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    flex: 1,
    height: "100%",
  },
  div: {
    backgroundColor: COLORS.white,
    padding: "10px 20px",
    borderRadius: 10,
    marginTop: "2rem",
  },
};

function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderArr = [slider, slider2, slider3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === 2 ? 0 : currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div style={{ ...styles.container }}>
      <DashboardLayout>
        <div>
          <div>
            {sliderArr?.map((dd, i) => {
              return currentIndex === i ? (
                <div>
                  <img src={dd} style={{ width: "100%" }} />
                </div>
              ) : null;
            })}
          </div>
          <div style={{ ...styles.div }}>
            <p
              style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}
            >
              TODAY
            </p>
            {["", "", "", "", ""]?.map((aa: any) => {
              return <GameCard />;
            })}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
