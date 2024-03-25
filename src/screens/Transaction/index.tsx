
import BottomTabs from '../../components/Tabs'
import bg from "../../assets/images/bg.png"
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useState } from 'react'
import { PiNavigationArrowDuotone } from "react-icons/pi";
import send1 from "../../assets/images/send-1.svg"
import send2 from "../../assets/images/send-2.svg"


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
    flexDirection: "column",
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
    width: "35%",
    padding: 10,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}



function Transaction() {
  const [show, setShow] = useState(false)


  return (
    <div>
      <div style={{ ...styles.div }}>
        <div style={{ ...styles.container }}>
          <h3 style={{ ...FONTS.h5, color: COLORS.white }}>Transaction</h3>
          <div>
            <IoIosNotificationsOutline size={25} color={COLORS.white} style={{ border: "1px solid white", borderRadius: "100%", padding: 5 }} />
          </div>
        </div>
        <div style={{ ...styles.ctn }}>
          <p style={{ ...FONTS.body7, color: COLORS.white }}>Account Balance</p>
          <div style={{ ...styles.rw }}>
            <p style={{ ...FONTS.body7, color: COLORS.white }}>NGN</p>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }} >
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
              <FaAsterisk color={COLORS.white} size={30} />
            </div>
            <div>
              {
                show ? <GoEye color={COLORS.white} onClick={() => setShow(!show)} /> : <GoEyeClosed color={COLORS.white} onClick={() => setShow(!show)} />
              }
            </div>
          </div>
        </div>

        <div style={{...styles.btnRow}}>
          <div style={{...styles.btn, backgroundColor: COLORS.cream}}>
            <img src={send2} />
            <p style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Withdraw</p>
          </div>

          <div style={{...styles.btn, backgroundColor: COLORS.lightOrange}}>
            <img src={send1} />
            <p style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Deposit</p>
          </div>
        </div>

      </div>
      <div className='top-container'>





        <BottomTabs />
      </div>

    </div>
  )
}

export default Transaction
