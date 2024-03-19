
import { Link, useLocation  } from 'react-router-dom';
import './BottomTabs.css'; // Import your CSS file for styling
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { PiWalletLight } from "react-icons/pi";
import { PiWalletFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";




const BottomTabs = () => {
  const location = useLocation();

  console.log({location})

  return (
    <div className="bottom-tabs">
      <Link to="/home" className="tab-item">
        <div className='box'>
          {
            location?.pathname === "/home" ?<HiHome size={25} color="#2D0D02" /> : <HiOutlineHome size={25} color='#979797' />
          }
          <div style={{color: location?.pathname === "/home" ? "#2D0D02" : "#979797" }}>Home</div>
        </div>
      </Link>
      <Link to="/bet-slip" className="tab-item">
        <div className='box'>
          {
            location?.pathname === "/bet-slip" ? <RiFileList3Fill size={25} color="#2D0D02" /> :  <RiFileList3Line size={25}  color='#979797'/>
          }
          <div style={{color: location?.pathname === "/bet-slip" ? "#2D0D02" : "#979797" }}>Bet Slip</div>
        </div>
      </Link>
      <Link to="/transaction" className="tab-item">
      <div className='box'>
        {
          location?.pathname === "/transaction" ? <PiWalletFill size={25} color="#2D0D02"  /> : <PiWalletLight size={25}  color='#979797' />  
        }
          <div style={{color: location?.pathname === "/transaction" ? "#2D0D02" : "#979797" }}>Transaction</div>
        </div>
      </Link>
      <Link to="/profile" className="tab-item">
      <div className='box'>
        {
          location?.pathname === "/profile" ? <FaUser size={25} color="#2D0D02" /> : <FaRegUser  size={25}  color='#979797'/>
        }
          <div style={{color: location?.pathname === "/profile" ? "#2D0D02" : "#979797" }}>Profile</div>
        </div>
      </Link>
    </div>
  );
};

export default BottomTabs;