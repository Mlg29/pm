
import BottomTabs from '../../components/Tabs'
import bg from "../../assets/images/bg.png"
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from 'react'

import send1 from "../../assets/images/send-1.svg"
import send2 from "../../assets/images/send-2.svg"
import TransactionCard from '../../components/TransactionCard';
import { useNavigate } from 'react-router-dom';
import { FlexDirection } from '../../utils/type';
import { useMediaQuery } from 'react-responsive';
import WithdrawalModal from '../../components/Modals/WithdrawaModal';
import DepositModal from '../../components/Modals/DepositModal';
import { useAppDispatch } from '../../redux/hooks';
import { getUserData } from '../../redux/slices/AuthSlice';


const styles = {
  div: {
    backgroundImage: `url(${bg})`,
    padding: "20px 0px 0px 0px"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,

  },
  ctn: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: 'center',
    alignItems: "center",
    margin: "2rem 0px"

  },
  rw: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: 250,
    margin: "20px 0px"
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2rem 0px"
  },
  btn: {
    padding: 10,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.cream,
    padding: "15px 0px",
    borderRadius: 40
  }
}



function Transaction() {
  const [show, setShow] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [deposit, setDeposit] = useState(false)
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch() as any;
  const [userData, setUserData] = useState(null);

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);


  return (
    <div>
      <div style={{ ...styles.div }}>
      {
        isMobile &&   <div style={{ ...styles.container }}>
        <h3 style={{ ...FONTS.h5, color: COLORS.white }}>Transaction</h3>
        <div style={{cursor: "pointer"}} onClick={() => navigate("/notification")}>
          <IoIosNotificationsOutline size={35} color={COLORS.white} style={{ border: "1px solid white", borderRadius: "100%", padding: 5 }} />
        </div>
      </div>
      }
        <div style={{ ...styles.ctn }}>
          <p style={{ ...FONTS.body7, color: COLORS.white }}>Account Balance</p>
          <div style={{ ...styles.rw }}>
            <p style={{ ...FONTS.body7, color: COLORS.white }}>NGN</p>
           {
            show ? <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                  <h2 style={{...FONTS.largeTitle, color: COLORS.white}}>{userData?.walletBalance}</h2>
              </div>
              :
              <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }} >
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
            </div>
           }
            <div style={{cursor: "pointer"}}> 
              {
                show ? <GoEye color={COLORS.white} onClick={() => setShow(!show)} /> : <GoEyeClosed color={COLORS.white} onClick={() => setShow(!show)} />
              }
            </div>
          </div>
        </div>

        <div style={{...styles.btnRow}}>
          {
            !isMobile && <div></div>
          }
          <div style={{...styles.btn, width: isMobile ? "35%" : "20%", backgroundColor: COLORS.cream, cursor: "pointer"}} 
          onClick={() => isMobile ? navigate("/withdrawal") : setShowTransfer(true)}
          >
            <img src={send2} />
            <p style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Withdraw</p>
          </div>

          <div style={{...styles.btn,width: isMobile ? "35%" : "20%", backgroundColor: COLORS.lightOrange, cursor: "pointer"}} 
          onClick={() => isMobile ? navigate("/deposit") : setDeposit(true)}>
            <img src={send1} />
            <p style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Deposit</p>
          </div>
          {
            !isMobile && <div></div>
          }
        </div>

      </div>
      <div className='top-container'>
            
            <h3 style={{...FONTS.h5}}>Recent Transactions</h3>
              <div>
              <TransactionCard 
                text="Deposit - 2DE3I2k..."
                amount="₦ 20,000"
                date="24 July, 2022. 10:40pm"
                incoming
              />
               <TransactionCard 
                text="Withdrawal - NI2..."
                amount="₦ 20,000"
                date="24 July, 2022. 10:40pm"
              />
               <TransactionCard 
                text="Win Credit - 2DE2k..."
                amount="₦ 20,000"
                date="24 July, 2022. 10:40pm"
                incoming
              />
              </div>

              <div style={{...styles.btn2}} onClick={() => navigate("/transaction-list")}>
                <h3 style={{...FONTS.h7, cursor: "pointer"}}>View All</h3>
              </div>


          {
            isMobile &&  <BottomTabs />
          }
       
      </div>

    
    <WithdrawalModal 
      show={showTransfer}
      handleClose={() => setShowTransfer(false)}
    />

    <DepositModal 
    show={deposit}
    handleClose={() => setDeposit(false)}
    />

    </div>
  )
}

export default Transaction
