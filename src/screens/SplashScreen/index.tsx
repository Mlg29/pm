
import splashLogo from "../../assets/images/splash.svg"
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
    <div>
       <img src={splashLogo} className="logo" alt="Vite logo" />
    </div>
  );
};

export default SplashScreen;
