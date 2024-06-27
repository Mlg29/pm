import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import { LuMinusCircle } from "react-icons/lu";
import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import { GoCircle } from "react-icons/go";
import Button from "../../components/Button";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import TextInput from "../../components/TextInput";
import { LuPlusCircle } from "react-icons/lu";
import { FlexDirection, MaxAmount, PasswordCreation } from "../../utils/type";
import { FaRegCheckCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { MaxAmountSchema } from "../../https/schemas";
import { ToastContainer, toast } from "react-toastify";
import PinModal from "../../components/Modals/PinModal";
import Header from "../../components/Header";
import { Form } from "react-bootstrap";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { updateBetFrequency } from "../../redux/slices/RestrictionSlice";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    padding: "0px 20px",
    flex: 1,
    height: "100%",
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
  },
  line: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px 0px 20px",
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  inactive: {
    backgroundColor: COLORS.semiGray,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px 10px 0px",
  },
};

function NumberOfGames() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState("1");
  const [selected, setSelected] = useState("");
  const [restrictBet, setRestrictBet] = useState(false);
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = () => {
    if (!selected) {
      toast.error("Frequency is required", {
        position: "bottom-center",
      });
      return;
    }

    setShow(true)
    return;
  }

  const increment = () => {
    const aa = parseInt(value) + 1;
    if (isNaN(aa)) {
      setValue("1");
    }
    setValue(aa?.toString());
  };

  const decrement = () => {
    const aa = parseInt(value) - 1;
    if (isNaN(aa)) {
      setValue("1");
    } else if (parseInt(value) < 2) {
      return;
    } else {
      setValue(aa?.toString());
    }
  };

  const handleSubmitData = async () => {
    
    const payload = {
      frequency: selected?.toUpperCase(),
      numberOfGames: parseInt(value),
      useRestrictions: restrictBet,
    };
    setLoader(true);
    try {
      var response = await dispatch(updateBetFrequency(payload)) as any;
      if(response?.error?.message === "Rejected") {
        setMessage(response?.payload)
        setMessageType("Rejected")
      }
      if (updateBetFrequency.fulfilled.match(response)) {

        setMessage("Congratulations, you have successfully set your bet restriction")
        setMessageType("Success")
        setTimeout(() => {
          setLoader(false);
          navigate(-1);
        }, 2000);
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        setMessage(errMsg)
        setMessageType("Rejected")
      }
    } catch (err) {}
  };

  const onChange = (e) => {
    const { id, checked } = e.target;
    setRestrictBet(checked);
  };

  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        {isMobile && <Header text="Number of Games" />}

        <div style={{ ...styles.row }}>
          {/* <img src={data?.image} onClick={data?.handleRoute} /> */}
          <div style={{ margin: "0px", width: "100%" }}>
            <h3 style={{ ...FONTS.body6, margin: "0px" }}>Bet Restriction</h3>
          </div>
          <Form.Check // prettier-ignore
            type="switch"
            style={{ transform: "scale(1.7)" }}
            key={"restrictions"}
            id={"restrictions"}
            // label={"restrictions"}
            // checked={checkedItems[data.id] || false}
            onChange={onChange}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <p>
            Number of Games <span style={{ color: "red" }}>*</span>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
              border: "0.5px solid gray",
              borderRadius: 10,
              marginTop: "5px",
            }}
          >
            <LuMinusCircle
              size={50}
              style={{ marginRight: "45px", cursor: "pointer" }}
              onClick={decrement}
            />
            <input
              placeholder="Enter number of games"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "white",
                textAlign: "center",
              }}
              value={value}
              onChange={(e) => setValue(e?.target.value)}
            />
            <LuPlusCircle
              size={50}
              style={{ marginLeft: "45px", cursor: "pointer" }}
              onClick={increment}
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <p>
            Frequency <span style={{ color: "red" }}>*</span>
          </p>
          <div>
            {["Daily", "Weekly", "Monthly"]?.map((dd) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "7px 0px",
                  }}
                  onClick={() => setSelected(dd)}
                >
                  {selected === dd ? <FaRegCheckCircle /> : <FaRegCircle />}
                  <p style={{ marginLeft: "10px" }}>{dd}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div style={{ ...styles.bottom }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "15px",
              backgroundColor: COLORS.cream,
              marginBottom: "10px",
            }}
          >
            <FaCircleExclamation
              size={20}
              style={{ paddingRight: "5px", color: COLORS.red }}
            />
            <p style={{ ...FONTS.body7 }}>
              Setting can’t be change within the first 3 months of the change.
            </p>
          </div>
          <div style={{ width: "100%" }}>
            {isMobile ? (
              <Button
                text="Save Settings"
                propStyle={{ width: "100%" }}
                isLoading={loader}
                // handlePress={() => navigate("/pin")}
                handlePress={() => handleSubmit()}
              />
            ) : (
              <Button
                text="Save Settings"
                propStyle={{ width: "100%" }}
                isLoading={loader}
                //   handlePress={() => navigate("/pin")}
                handlePress={() => handleSubmit()}
              />
            )}
          </div>
        </div>
      </div>

      <PinModal 
        show={show}
        handleClose={handleClose}
        handleAction={handleSubmitData}
        type={messageType === "Rejected" ? "failed" : "success"}
        responseText={message ? message : "Update Successful"}
      
      />

      <ToastContainer />
    </div>
  );
}

export default NumberOfGames;
