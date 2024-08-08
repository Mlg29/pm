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
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FlexDirection, PinCreation } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { CreatePinSchema } from "../../https/schemas";
import { updateTransactionPin } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { MdPrivacyTip } from "react-icons/md";
import PinModal from "../../components/Modals/PinModal";

export const styles = {
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
    margin: "0px 0px 10px 0px",
  },
};

function ChangeTransactionPin() {
  const [step, setStep] = useState(3);
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const [show, setShow] = useState(false)
  const [storePayload, setStorePayload] = useState(null)


  const handleClose = () => {
    setShow(false)
  }


  const initialValues: PinCreation = {
    oldPin: "",
    pin: "",
    confirmPin: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: CreatePinSchema,
      onSubmit: (data: PinCreation) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
    // const payload = {
    //   transactionPin: data?.pin,
    // };
    // setStorePayload(payload)
    // setShow(true)
    // return;
    handleAction()
  };

  const handleAction = async() => {
    setLoader(true);
    try {
      var response = await dispatch(updateTransactionPin(storePayload));
      if (updateTransactionPin.fulfilled.match(response)) {
        toast.success(response?.payload?.data?.message, {
          position: "bottom-center",
        });
    
    setTimeout(() => {
      setLoader(false)
      localStorage.clear();
      navigate("/login");
    }, 1000);
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        toast.error(errMsg, {
          position: "bottom-center",
        });
      }
    } catch (err) {}
  }


  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        {isMobile && (
          <>
            <div style={{ marginTop: 10 }}>
              <BackButton />
            </div>
          </>
        )}

        <div>
          <h3
            style={{
              ...FONTS.h2,
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px 0px",
            }}
          >
            Change Transaction PIN
          </h3>

          <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
            Enter a 6-digit PIN for transaction authorization.
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
        <TextInput
            label="Current Pin"
            placeholder="Enter your current 6 digit  pin"
            required
            isNumeric
            type="password"
            value={values.oldPin}
            onChangeText={handleChange("oldPin")}
            errorMsg={touched.oldPin ? errors.oldPin : undefined}
          />

          <TextInput
            label="New Pin"
            placeholder="Enter your new 6 digit pin"
            required
            isNumeric
            type="password"
            value={values.pin}
            onChangeText={handleChange("pin")}
            errorMsg={touched.pin ? errors.pin : undefined}
          />

          <TextInput
            label="Confirm Pin"
            placeholder="Enter your 6 digit pin"
            required
            isNumeric
            type="password"
            value={values.confirmPin}
            onChangeText={handleChange("confirmPin")}
            errorMsg={touched.confirmPin ? errors.confirmPin : undefined}
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "15px",
            backgroundColor: COLORS.cream,
            marginBottom: "10px",
          }}
        >
          <MdPrivacyTip size={30} style={{ paddingRight: "5px" }} />
          <p style={{ ...FONTS.body7 }}>
            You are advised to be careful with your PIN. Playzeet will not take
            responsibility of PIN compromise.
          </p>
        </div>
        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            {isMobile ? (
              <Button
                text="Continue"
                isLoading={loader}
                propStyle={{ width: "100%" }}
                handlePress={() => handleSubmit()}
              />
            ) : (
              <Button
                text="Submit"
                isLoading={loader}
                propStyle={{ width: "100%" }}
                handlePress={() => handleSubmit()}
              />
            )}
          </div>
        </div>
      </div>

      {/* <PinModal
        show={show}
        handleClose={handleClose}
        handleAction={handleAction}
        responseText="Pin Updated Successfully"
        type=""
      
      /> */}
      <ToastContainer />
    </div>
  );
}

export default ChangeTransactionPin;
