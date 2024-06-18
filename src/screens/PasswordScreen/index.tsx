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
import { FlexDirection, PasswordCreation } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { CreatePasswordSchema } from "../../https/schemas";
import { createUser } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from 'react-toastify';


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
    margin: "1rem 0px 10px 0px",
  },
};

function PasswordScreen() {
  const [step, setStep] = useState(2);
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const getPendingData = JSON.parse(localStorage.getItem("pendingData"));
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const initialValues: PasswordCreation = {
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: CreatePasswordSchema,
      onSubmit: (data: PasswordCreation) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
    const payload = {
      ...getPendingData,
      password: data?.password,
    };

    setLoader(true);
    try {
      var response = await dispatch(createUser(payload));
      if (createUser.fulfilled.match(response)) {
        localStorage.removeItem("pendingData");
        localStorage.setItem("token", response?.payload?.data?.accessToken)
        toast.success("Success", {
          position: "bottom-center",
        });

        setTimeout(() => {
          setLoader(false);
          navigate("/pin");
          // navigate("/auth-success");

        }, 1000);
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        toast.error(errMsg, {
          position: "bottom-center",
        });
      }
    } catch (err) {}
  };

  const stepLevel = () => {
    if (step === 0) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      );
    } else if (step === 4) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
        </div>
      );
    } else {
    }
  };

  const requirements = [
    {
      id: 1,
      text: "At least one uppercase",
      check: (/[A-Z]/.test(values.password)),
    },
    {
      id: 2,
      text: "At least one lowercase",
      check: (/[a-z]/.test(values.password)),
    },
    {
      id: 3,
      text: "At least one special character",
      check: (/[!@#$%^&*]/.test(values.password)),
    },
    {
      id: 4,
      text: "At least one number",
      check: (/\d/.test(values.password)),
    },
  ];



  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        {isMobile && (
          <>
            <div style={{ marginTop: 10 }}>
              <BackButton />
            </div>
            {stepLevel()}
          </>
        )}

        <div>
          {isMobile && (
            <h3
              style={{
                ...FONTS.h2,
                fontWeight: "bold",
                textAlign: "center",
                margin: "10px 0px",
              }}
            >
              Create Your Log In Password
            </h3>
          )}
          <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
            Create a new password for your account.
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            required
            type="password"
            value={values.password}
            onChangeText={handleChange("password")}
            errorMsg={touched.password ? errors.password : undefined}
    
          />

          <div style={{ margin: "0px 0px 10px 0px" }}>
            {requirements?.map((data: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "5px 0px",
                  }}
                >
                  {values?.password?.length > 0 ? (
                    <div>
                      {data?.check ? (
                        <IoIosCheckmarkCircle color={COLORS.green} />
                      ) : (
                        <MdCancel color={COLORS.red} />
                      )}
                    </div>
                  ) : (
                    <GoCircle />
                  )}

                  <p style={{ ...FONTS.body6, margin: "0px 5px" }}>
                    {data?.text}
                  </p>
                </div>
              );
            })}
          </div>

          <TextInput
            label="Confirm Password"
            placeholder="Enter your password"
            required
            type="password"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            errorMsg={touched.confirmPassword ? errors.confirmPassword : undefined}
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
          <div style={{ width: "100%" }}>
            {isMobile ? (
              <Button
                text="Continue"
                propStyle={{ width: "100%" }}
                isLoading={loader}
                // handlePress={() => navigate("/pin")}
                handlePress={() => handleSubmit()}
              />
            ) : (
              <Button
                text="Submit"
                propStyle={{ width: "100%" }}
                isLoading={loader}
                //   handlePress={() => navigate("/pin")}
                handlePress={() => handleSubmit()}
              />
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default PasswordScreen;
