
import BottomTabs from '../../components/Tabs'
import notification from "../../assets/images/notification.svg"
import { useNavigate } from 'react-router-dom'
import { styles } from './style'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { useState } from 'react'
import EmptyState from '../../components/EmptyState'
import SlipCard from '../../components/SlipCard'
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import user from "../../assets/images/user.svg"
import { useMediaQuery } from 'react-responsive'



function BetSlip() {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
const isMobile = useMediaQuery({ maxWidth: 767 })


  return (
    <div className='top-container'>
      <div style={{ ...styles.container }}>
        <h3>Bet Slip</h3>
        {
          isMobile &&  <img src={notification} onClick={() => navigate("/notification")} />
        }
       
      </div>
      <div style={{ ...styles.tabs }}>
        <div style={{ ...styles.tb, backgroundColor: active === "active" ? COLORS.white : "transparent", cursor: "pointer" }} onClick={() => setActive("active")}>
          <p style={{ ...FONTS.body6 }}>Active</p>
        </div>
        <div style={{ ...styles.tb, backgroundColor: active === "past" ? COLORS.white : "transparent", cursor: "pointer" }} onClick={() => setActive("past")}>
          <p style={{ ...FONTS.body6 }}>Past</p>
        </div>
        <div style={{ ...styles.tb, backgroundColor: active === "opponent" ? COLORS.white : "transparent", cursor: "pointer" }} onClick={() => setActive("opponent")}>
          <p style={{ ...FONTS.body6 }}>Opponent</p>
        </div>
      </div>

    {
      active === "active" &&   <div>
      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>TODAY</p>
      <SlipCard
        homeName="Milan"
        awayName="AS Roma"
        homeScore={4}
        awayScore={1}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />

      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>12/02/2024</p>
      <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={1}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={2}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="Barcelona"
        homeScore={4}
        awayScore={3}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />
    </div>
    }

{
      active === "past" &&   <div>
      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>TODAY</p>
      <SlipCard
        homeName="Milan"
        awayName="AS Roma"
        homeScore={4}
        awayScore={1}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />
      <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={1}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />

      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>12/02/2024</p>
      <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={1}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={2}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="Barcelona"
        homeScore={4}
        awayScore={3}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />
    </div>
    }

{
      active === "opponent" &&   <div>
      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>TODAY</p>
      {
      ["", "", "", "","","",""]?.map((data, i)=> {
        return (
          <div key={i} style={{...styles.rowBtw, cursor: "pointer"}} onClick={() => navigate("/opponent-detail")}>
             <div style={{...styles.row}}>
                <img src={user} width={40} />
                <h3 style={{...FONTS.h7, margin: "0px 0px 0px 5px" }}>@JohnDdon2</h3>
            </div>

            <div>
              <h3 style={{...FONTS.h6, margin: "0px 0px 0px 5px" }}>4 games</h3>
              <p style={{...FONTS.body7, margin: "2px 0px 0px 5px", textAlign: "right" }}>won 2</p>
            </div>
          </div>
        )
      })
}


    </div>
    }
    {
      active === "" && <div>
        <EmptyState
          header="No active bet"
          text="Concluded bet will be displayed here."
        />
      </div>
    }
      
      {
        isMobile && <BottomTabs />
      }
     
    </div>
  )
}

export default BetSlip
