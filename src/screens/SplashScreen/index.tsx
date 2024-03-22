
import bigLogo from "../../assets/images/bigLogo.svg"
// src/SplashScreen.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Assuming isNewUser is a boolean indicating if the user is new or returning
      const isNewUser = true; // You would replace this with your actual logic
      if (isNewUser) {
       navigate('/onboarding');
      } else {
        navigate('/login');
      }
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100%', width: "100%", backgroundColor: "#2D0D02"}}>
       <img src={bigLogo} className="logo" alt="Vite logo" />
    </div>
  );
};

export default SplashScreen;
