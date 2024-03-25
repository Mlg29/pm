
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



function BetSlip() {
  const navigate = useNavigate()
  const [active, setActive] = useState("")


  return (
    <div className='top-container'>
      <div style={{ ...styles.container }}>
        <h3>Bet Slip</h3>
        <img src={notification} onClick={() => navigate("/notification")} />
      </div>
      <div style={{ ...styles.tabs }}>
        <div style={{ ...styles.tb, backgroundColor: active === "active" ? COLORS.white : "transparent" }} onClick={() => setActive("active")}>
          <p style={{ ...FONTS.body6 }}>Active</p>
        </div>
        <div style={{ ...styles.tb, backgroundColor: active === "past" ? COLORS.white : "transparent" }} onClick={() => setActive("past")}>
          <p style={{ ...FONTS.body6 }}>Past</p>
        </div>
        <div style={{ ...styles.tb, backgroundColor: active === "opponent" ? COLORS.white : "transparent" }} onClick={() => setActive("opponent")}>
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
      <SlipCard
        homeName="Milan"
        awayName="AS Roma"
        homeScore={4}
        awayScore={1}
        homeImage={milan}
        awayImage={roma}
        isWin
        isUser
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
        isUser
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
        isUser
      />
       <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={2}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
        isUser
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
        isUser
      />
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
      
      <BottomTabs />
    </div>
  )
}

export default BetSlip
