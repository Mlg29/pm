
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import OnboardScreen from './OnboardScreen';
import Login from './LoginScreen';
import HomeScreen from './HomeScreen';
import BetSlip from './BetSlip';
import Transaction from './Transaction';
import Profile from './Profile';
import ProtectedRoute from "../components/ProtectedRoute.jsx"
import { useState } from 'react';
import SignupScreen from './SignupScreen/index.js';

function Routers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
    <Routes>
      <Route path="/"  element={<SplashScreen />} />
      <Route path="/onboarding" element={<OnboardScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignupScreen />} />
      {/* <ProtectedRoute
            path="/home"
           element={<HomeScreen />}
            isAuthenticated={isAuthenticated}
          />
           <ProtectedRoute
            path="/bet-slip"
           element={<BetSlip />}
            isAuthenticated={isAuthenticated}
          />
           <ProtectedRoute
            path="/transaction"
           element={<Transaction />}
            isAuthenticated={isAuthenticated}
          />
           <ProtectedRoute
            path="/profile"
           element={<Profile />}
            isAuthenticated={isAuthenticated}
          /> */}
         
     <Route path="/home" element={<HomeScreen />} />
      <Route path="/bet-slip" element={<BetSlip />} />
       <Route path="/transaction" element={<Transaction />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  )
}

export default Routers
