
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
import VerifyScreen from './VerifyScreen/index.js';
import PasswordScreen from './PasswordScreen/index.js';
import TransactionPin from './TransactionPin/index.js';
import SecretQuestion from './SecretQuestion/index.js';
import AuthSuccess from './AuthSuccess/index.js';
import ForgetPassword from './ForgetPassword/index.js';
import NotificationScreen from './NotificationScreen/index.js';
import GameDetails from './GameDetails/index.js';
import BetDetail from './BetDetail/index.js';
import TransactionList from './TransactionList/index.js';
import Deposit from './Deposit/index.js';
import Withdrawal from './Withdrawal/index.js';
import PaymentOptions from './PaymentOptions/index.js';
import BankTransfer from './PaymentOptions/BankTransfer.js';
import WalletPin from './PaymentOptions/WalletPin.js';
import FundWallet from './PaymentOptions/FundWallet.js';
import BankWithdraw from './Withdrawal/BankWithdraw.js';
import EditProfile from './Profile/EditProfile.js';
import ProfileDetail from './Profile/ProfileDetail.js';
import Security from './Security/index.js';
import Preference from './NotificationScreen/Preference.js';
import Language from './NotificationScreen/Language.js';
import Biometric from './Security/Biometric.js';
import OpenBet from './OpenBets/index.js';
import OpponentDetail from './OpponentDetail/index.js';

function Routers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
    <Routes>
      <Route path="/"  element={<HomeScreen />} />
      <Route path="/onboarding" element={<OnboardScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignupScreen />} />
      <Route path="/verify" element={<VerifyScreen />} />
      <Route path="/create-password" element={<PasswordScreen />} />
      <Route path="/pin" element={<TransactionPin />} />
      <Route path="/secret-question" element={<SecretQuestion />} />
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/notification" element={<NotificationScreen />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
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
      <Route path="/game-details" element={<GameDetails />} />
      <Route path="/bet-detail" element={<BetDetail />} />
      <Route path="/transaction-list" element={<TransactionList />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdrawal" element={<Withdrawal />} />
      <Route path="/payment-options" element={<PaymentOptions />} />
      <Route path="/bank-transfer" element={<BankTransfer />} />
      <Route path="/wallet-pin" element={<WalletPin />} />
      <Route path="/fund-wallet" element={<FundWallet />} />
      <Route path="/bank-withdraw" element={<BankWithdraw />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/profile-detail" element={<ProfileDetail />} />
      <Route path="/security" element={<Security />} />
      <Route path="/notification-preference" element={<Preference />} />
      <Route path="/language" element={<Language />} />
      <Route path="/biometrics" element={<Biometric />} />
      <Route path="/open-bets" element={<OpenBet />} />
      <Route path="/opponent-detail" element={<OpponentDetail />} />
    
    </Routes>
  </Router>
  )
}

export default Routers
