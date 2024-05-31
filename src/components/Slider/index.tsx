import React, { useState, useEffect, memo } from "react";
import slider from "../../assets/images/slider.svg";
import slider2 from "../../assets/images/slider2.svg";
import slider3 from "../../assets/images/slider3.svg";

// Child component which should re-render only when needed
const SliderComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderArr = [slider, slider2, slider3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  
  return (
    <div>
      {sliderArr?.map((dd, i) => {
        return currentIndex === i ? (
          <div>
            <img src={dd} style={{ width: "100%" }} />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default SliderComponent;
