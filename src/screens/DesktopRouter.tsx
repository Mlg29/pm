
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
import Layout from '../components/Layout/index.js';
import Dashboard from './DesktopScreens/Dashboard.js';
import DashboardLayout from './DesktopScreens/Components/DashboardLayout.js';
import Options from './PaymentOptions/Options.js';
import OpponentDetail from './OpponentDetail/index.js';
import BetSuccess from './SuccessScreen/BetSuccess.js';
import CreateBet from './CreateBet/index.js';
import InviteFriend from './InviteFriend/index.js';
import ChallengeDetail from './ChallengeDetail/index.js';
import AdjustBet from './AdjustBet/index.js';
import SubLayout from './DesktopScreens/Components/SubLayout.js';
import ProfileScreen from './DesktopScreens/ProileScreen.js';
import CreatePasswordNew from './PasswordScreen/CreatePassword.js';
import PasswordSuccess from './SuccessScreen/PasswordSuccess.js';
import ForgetPasswordVerify from './VerifyScreen/ForgetPasswordVerify.js';
import TermsAndConditions from './TermsAndConditions.js';
import PinSuccess from './SuccessScreen/PinSuccess.js';
import GameEventData from './HomeScreen/GameEventData.js';

function DesktopRouters() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
    <Routes>
      <Route path="/"  element={<Dashboard />} />
      <Route path="/onboarding" element={<Layout><OnboardScreen /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/sign-up" element={<Layout><SignupScreen /></Layout>} />
      <Route path="/verify" element={<Layout><VerifyScreen /></Layout>} />
      <Route path="/create-password" element={<Layout><PasswordScreen /></Layout>} />
      <Route path="/pin" element={<Layout><TransactionPin /></Layout>} />
      <Route path="/secret-question" element={<Layout><SecretQuestion /></Layout>} />
      <Route path="/auth-success" element={<Layout><AuthSuccess /></Layout>} />
      <Route path="/notification" element={<NotificationScreen />} />
      <Route path="/forget-password" element={<Layout><ForgetPassword /></Layout>} />
      <Route path="/create-new-password" element={<Layout><CreatePasswordNew /></Layout>} />
      <Route path="/password-success" element={<Layout><PasswordSuccess /></Layout>} />
      <Route path="/forget-password-verify" element={<Layout><ForgetPasswordVerify /></Layout>} />
      <Route path="/terms-and-conditions" element={<Layout><TermsAndConditions /></Layout>} />
      <Route path="/pin-success" element={<Layout><PinSuccess /></Layout>} />
     <Route path="/home" element={<Dashboard />} />
     <Route path="/events" element={<GameEventData/>} />
      <Route path="/bet-slip" element={<SubLayout><BetSlip /></SubLayout>} />
       <Route path="/transaction" element={<SubLayout><Transaction /></SubLayout>} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/game-details" element={<DashboardLayout><GameDetails /></DashboardLayout>} />
      <Route path="/bet-detail" element={<SubLayout><BetDetail /></SubLayout>} />
      <Route path="/transaction-list" element={<SubLayout><TransactionList /></SubLayout>} />
      <Route path="/deposit" element={<DashboardLayout><Deposit /></DashboardLayout>} />
      <Route path="/withdrawal" element={<DashboardLayout><Withdrawal /></DashboardLayout>} />
      <Route path="/payment-options" element={<DashboardLayout><PaymentOptions /></DashboardLayout>} />
      <Route path="/bank-transfer" element={<DashboardLayout><BankTransfer /></DashboardLayout>} />
      <Route path="/wallet-pin" element={<DashboardLayout><WalletPin /></DashboardLayout>} />
      <Route path="/fund-wallet" element={<DashboardLayout><FundWallet /></DashboardLayout>} />
      <Route path="/bank-withdraw" element={<DashboardLayout><BankWithdraw /></DashboardLayout>} />
      <Route path="/edit-profile" element={<DashboardLayout><EditProfile /></DashboardLayout>} />
      <Route path="/profile-detail" element={<DashboardLayout><ProfileDetail /></DashboardLayout>} />
      <Route path="/security" element={<DashboardLayout><Security /></DashboardLayout>} />
      <Route path="/notification-preference" element={<DashboardLayout><Preference /></DashboardLayout>} />
      <Route path="/language" element={<DashboardLayout><Language /></DashboardLayout>} />
      <Route path="/biometrics" element={<DashboardLayout><Biometric /></DashboardLayout>} />
      {/* <Route path="/open-bets" element={<DashboardLayout><OpenBet /></DashboardLayout>} /> */}
      <Route path="/options" element={<DashboardLayout><Options /></DashboardLayout>} />
      <Route path="/opponent-detail" element={<SubLayout><OpponentDetail /></SubLayout>} />
      <Route path="/bet-success" element={<DashboardLayout><BetSuccess /></DashboardLayout>} />
      <Route path="/create-bet" element={<DashboardLayout><CreateBet/></DashboardLayout>} />
      <Route path="/invite" element={<DashboardLayout><InviteFriend/></DashboardLayout>} />
      <Route path="/challenge-detail" element={<DashboardLayout><ChallengeDetail /></DashboardLayout>} />
      <Route path="/adjust-bet" element={<DashboardLayout><AdjustBet /></DashboardLayout>} />
    
    </Routes>
  </Router>
  )
}

export default DesktopRouters
