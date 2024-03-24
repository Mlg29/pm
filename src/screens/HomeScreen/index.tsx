
import BottomTabs from '../../components/Tabs'
import notification from "../../assets/images/notification.svg"
import { RxAvatar } from "react-icons/rx";
import { FONTS } from '../../utils/fonts';
import SearchComponent from '../../components/SearchComponent';
import slider from "../../assets/images/slider.svg"
import more from "../../assets/images/more.svg"
import { IoMdFootball } from "react-icons/io";
import { MdSportsCricket } from "react-icons/md";
import { FaBasketballBall } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { MdSportsRugby } from "react-icons/md";
import { COLORS } from '../../utils/colors';
import GameCard from '../../components/GameCard';


function HomeScreen() {

  const itemList = [
    {
      id: 1,
      name: "Soccer",
      image: <IoMdFootball size={20} color={COLORS.white} />
    },
    {
      id: 2,
      name: "Basketball",
      image: <FaBasketballBall size={20} />
    },
    {
      id: 3,
      name: "Tennis",
      image: <IoIosTennisball size={20} />
    },
    {
      id: 4,
      name: "Cricket",
      image: <MdSportsCricket size={20} />
    },
    {
      id: 5,
      name: "Rugby",
      image: <MdSportsRugby size={20} />
    },
    {
      id: 6,
      name: "More",
      image: more
    },
  ]


  return (
    <div className='top-container'>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RxAvatar size={50} />
          <h3 style={{ ...FONTS.h5, margin: "0px 5px" }}>Hi Samson 0.</h3>
        </div>

        <img src={notification} />

      </div>

      <SearchComponent 
        placeholder="Search by event, sport, club or game"
      />

      <div> 
        <img src={slider} style={{width: "100%"}} />
      </div>

      <div style={{ display: "flex", overflowX: 'auto', whiteSpace: 'nowrap', margin: "10px 0px", scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
        {
          itemList?.map((info: any) => {
            return (
              <div key={info?.id} style={{ display: 'inline-block', margin: '0 5px' }}>
                <div style={{display: "flex", padding: "10px", backgroundColor: info?.name === "Soccer" ? COLORS.primary : "transparent", borderRadius: "30px", border: `1px solid ${COLORS.semiGray}`}}>
                {
                  info?.name === "More" ? <img src={info?.image} /> : info?.image
                }
                <p style={{...FONTS.body6, color: info?.name === "Soccer" ? COLORS.white : COLORS.primary, margin: "0px 5px"}}>{info?.name}</p>
                </div>
              </div>
            )
          })
        }
      </div>

        <p style={{...FONTS.body6, color: COLORS.gray, margin: "15px 0px"}}>TODAY</p>
       
       {
        ["","","","",""]?.map((aa: any) => {
          return <GameCard />
        })
       }



      <BottomTabs />
    </div>
  )
}

export default HomeScreen
