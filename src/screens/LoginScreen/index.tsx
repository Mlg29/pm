import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getCountryListMap } from "country-flags-dial-code";
import { FONTS } from "../../utils/fonts";
import miniLogo from "../../assets/images/miniLogo.svg";
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { FlexDirection, LoginFormData } from "../../utils/type";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { LoginSchema } from "../../https/schemas";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../redux/slices/AuthSlice";
import CountryPhone from "../../components/CountryPhone";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { IPInfoContext } from "ip-info-react";



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

function LoginScreen() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("email");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const betInviteId = localStorage.getItem("bet-invite-id");
  const [country, setCountry] = useState("Nigeria");
  const [countryList, setCountryList] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("")
  const userIp = useContext(IPInfoContext);
 

  console.log("nav", navigator)

  const countryListCode = countryList?.find((dd) => phoneNumber.includes(dd?.dialCode));



  useEffect(() => {
    const countries1 = getCountryListMap();
    // console.log(countries1);
    let x = Array.from(Object.values(countries1));
    // console.log(x[0], "x");
    setCountryList(x);
    // getData()
  }, []);

  const initialValues: LoginFormData = {
    password: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: (data: LoginFormData) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


    if(!email && !phoneNumber) {
      alert("Enter a valid email address or phone number")
      return;
    }
    if (email && !emailRegex.test(email)) {
      alert("Enter a valid email address")
      return
    }

    const payload = {
      identifier: loginType === "email" ? email : phoneNumber,
      password: data?.password,
      countryIso: countryListCode?.code,
      device: {
        deviceName: navigator?.userAgent,
        deviceId: navigator?.userAgent,
        devicePlatform: navigator?.platform
      }
    };

    setLoader(true);
    try {
      var response = await dispatch(login(payload));
      if (login.fulfilled.match(response)) {
        // localStorage.setItem("userData", JSON.stringify(response?.payload?.data?.user))
        localStorage.setItem("token", response?.payload?.data?.accessToken);
        toast.success(response?.payload?.data?.message, {
          position: "bottom-center",
        });

        setTimeout(() => {
          setLoader(false);
          if (betInviteId) {
            navigate(`/bet-invite-detail?${betInviteId}`);
            return;
          } else {
            navigate("/home");
          }
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


  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <img src={miniLogo} width={100} />
          <h3
            style={{
              ...FONTS.h2,
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px 0px",
            }}
          >
            {" "}
            Log In
          </h3>
          <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
            Enter your Log In credentials to gain access to your account.
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                ...FONTS.body7,
                cursor: "pointer",
                color: loginType === "email" ? COLORS.orange : "black",
              }}
              onClick={() => setLoginType("email")}
            >
              Email Login
            </h3>
            <h3
              style={{
                ...FONTS.body7,
                marginLeft: 10,
                cursor: "pointer",
                color: loginType === "phone" ? COLORS.orange : "black",
              }}
              onClick={() => setLoginType("phone")}
            >
              Phone number Login
            </h3>
          </div>
          {loginType === "email" ? (
            <TextInput
              label="Email Address"
              placeholder="Email Address"
              required
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          ) : (
            <div style={{ width: "100%", marginBottom: 10 }}>
              <label style={{ ...FONTS.body7 }}>
                Phone number 
                 <span style={{ color: "red" }}> *</span>
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                value={phoneNumber}
                onChange={(val) => setPhoneNumber(val)}
                style={{
                  width: "100%",
                  color: "black",
                  border: `0.5px solid ${COLORS.gray}`,
                  padding: 15,
                  borderRadius: "10px",
                }}
              />
            </div>
          )}

          <TextInput
            label="Password"
            placeholder="Enter your password"
            required
            type="password"
            value={values.password}
            onChangeText={handleChange("password")}
            errorMsg={touched.password ? errors.password : undefined}
          />

          <div style={{ margin: "20px 0px" }}>
            <p
              style={{
                ...FONTS.body7,
                fontWeight: "bold",
                color: `${COLORS.primary}`,
                textAlign: "right",
                cursor: "pointer",
              }}
              onClick={() => navigate("/forget-password")}
            >
              Forget Password?
            </p>
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
          <div style={{ width: "100%" }}>
            <Button
              text="Log In"
              propStyle={{ width: "100%" }}
              isLoading={loader}
              handlePress={() => handleSubmit()}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              alignItems: "center",
              margin: "20px 0px",
            }}
          >
            <p style={{ ...FONTS.body6 }}>Don’t have an account? </p>
            <p
              style={{ ...FONTS.h6, margin: "0px 3px" }}
              onClick={() => navigate("/sign-up")}
            >
              {" "}
              Create Account
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginScreen;
