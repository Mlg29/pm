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
import { FlexDirection, MaxAmount, PasswordCreation } from "../../utils/type";

import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { MaxAmountSchema } from "../../https/schemas";
import { ToastContainer, toast } from "react-toastify";
import PinModal from "../../components/Modals/PinModal";
import Header from "../../components/Header";
import { Form } from "react-bootstrap";

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
};

function Maximum() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const [show, setShow] = useState(false);
  const [storePayload, setStorePayload] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const initialValues: MaxAmount = {
    amount: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: MaxAmountSchema,
      onSubmit: (data: MaxAmount) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
    const payload = {
      password: data?.password,
    };

    setStorePayload(payload);
    setShow(true);

    return;
  };

  const handleAction = async () => {
    setLoader(true);
    // try {
    //   var response = await dispatch(createNewPassword(storePayload));
    //   if (createNewPassword.fulfilled.match(response)) {
    //     toast.success(response?.payload?.data?.message, {
    //       position: "bottom-center",
    //     });
    //     setLoader(false);
    //     setTimeout(() => {
    //       setLoader(false);
    //       localStorage.clear();
    //       navigate("/login");
    //     }, 1000);
    //   } else {
    //     var errMsg = response?.payload as string;
    //     setLoader(false);
    //     toast.error(errMsg, {
    //       position: "bottom-center",
    //     });
    //   }
    // } catch (err) {}
  };

  const onChange = (e) => {
    const { id, checked } = e.target;
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

        <div style={{ marginTop: 20 }}>
          <TextInput
            label=" Maximum Transaction Amount per Bet"
            placeholder="0.00"
            required
            type="amount"
            value={values.amount}
            onChangeText={handleChange("amount")}
            errorMsg={touched.amount ? errors.amount : undefined}
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
            <FaCircleExclamation size={20} style={{ paddingRight: "5px", color: COLORS.red }} />
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
        handleAction={handleAction}
        responseText="Password Updated Successfully"
      />

      <ToastContainer />
    </div>
  );
}

export default Maximum;
