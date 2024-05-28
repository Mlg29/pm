import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import key from "../../assets/images/key.svg";
import lock from "../../assets/images/lock.svg";
import scan from "../../assets/images/finger-scan.svg";
import { FONTS } from "../../utils/fonts";
import arrowright from "../../assets/images/arrow-right.svg";
import Form from "react-bootstrap/Form";
import { useMediaQuery } from "react-responsive";
import ChangePassword from "../../components/Modals/ChangePassword";
import ChangePin from "../../components/Modals/ChangePin";
import { useState } from "react";
import SecretQuest from "../../components/Modals/SecretQuestion";
import PinModal from "../../components/Modals/PinModal";


const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
    cursor: "pointer",
  },
};

function Security() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showQuest, setShowQuest] = useState(false);



  const handlePasswordChange = () => {
    setShowPassword(true);
  };

  const handleQuestChange = () => {
    setShowQuest(true);
  };

  const handlePinChange = () => {
    setShowPin(true);
  };

  const dataList = [
    // {
    //   id: 1,
    //   name: "Create Secret Question",
    //   image: scan,
    //   handleRoute: isMobile ? () => navigate("/secret-question") : () => handleQuestChange(),
    // }, 
    {
      id: 2,
      name: "Change Password",
      image: lock,
      handleRoute: isMobile
        ? () => navigate("/create-new-password")
        : () => handlePasswordChange(),
    },
    {
      id: 3,
      name: "Change PIN",
      image: key,
      handleRoute: isMobile ? () => navigate("/change-pin") : () => handlePinChange(),
    },
  ];

  return (
    <div className="top-container">
      {isMobile && <Header text="Security" />}

      <div>
        {dataList?.map((data: any) => {
          return (
            <div
              key={data?.id}
              style={{ ...styles.row }}
              onClick={data?.handleRoute}
            >
              <img src={data?.image} />
              <div
                onClick={data?.handleRoute}
                style={{ margin: "0px 10px", width: "100%" }}
              >
                <h3 style={{ ...FONTS.body6, margin: "0px" }}>{data?.name}</h3>
              </div>
              {/* {
                                data?.name === "Biometrics" ?  <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                style={{ transform: 'scale(1.7)' }}
                              />
                              :  <img src={arrowright} />
                            } */}
              <img src={arrowright} />
            </div>
          );
        })}
      </div>

      <ChangePassword
        show={showPassword}
        handleClose={() => setShowPassword(false)}
      />

      <ChangePin show={showPin} handleClose={() => setShowPin(false)} />

      <SecretQuest show={showQuest} handleClose={() => setShowQuest(false)} />
   
   
     
   
    </div>
  );
}

export default Security;
