import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";

import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import { GoCircle } from "react-icons/go";
import Button from "../../components/Button";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import TextInput from "../../components/TextInput";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  FlexDirection,
  MaxAmount,
  PasswordCreation,
  TextAlign,
} from "../../utils/type";

import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { MaxAmountSchema } from "../../https/schemas";
import { ToastContainer, toast } from "react-toastify";
import PinModal from "../../components/Modals/PinModal";
import Header from "../../components/Header";
import { Form } from "react-bootstrap";
import { InputNumber } from "primereact/inputnumber";
import NumberInput from "../../components/NumberInput";
import { updateBetRestriction } from "../../redux/slices/RestrictionSlice";

export const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
  },
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    padding: "0px 20px",
    flex: 1,
    height: "100%",
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
  inputs: {
    width: "100%",
    padding: 13,
    // border: "none",
    outline: "none",
    fontWight: "600",
    fontFamily: "Poppins",
    color: "black",
    backgroundColor: "red",
  },
};

function Maximum() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const [restrictBet, setRestrictBet] = useState(false);
  const [amount, setAmount] = useState<any>("");
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = () => {
    if (!amount) {
      toast.error("Amount is required", {
        position: "bottom-center",
      });
      return;
    }

        setShow(true)
    return;
  }

  const handleSubmitData = async () => { 
    const payload = {
      maxBetAmount: amount,
      useRestrictions: restrictBet,
    };

    setLoader(true);
      try {
      var response = await dispatch(updateBetRestriction(payload)) as any
      if(response?.error?.message === "Rejected") {
        setMessage(response?.payload)
        setMessageType("Rejected")
      }
      if (updateBetRestriction.fulfilled.match(response)) {
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
    setRestrictBet(checked)
  };



  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        {isMobile && <Header text="Maximum Amount" />}

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

        <div style={{ marginTop: 20, width: "100%" }}>
          <NumberInput
            label="Maximum Transaction Amount per Bet"
            placeholder="Enter Amount"
            required
            value={amount}
            setValue={(val) => setAmount(val)}
          />
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

export default Maximum;
