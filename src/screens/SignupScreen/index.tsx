import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FONTS } from "../../utils/fonts";
import TextInput from "../../components/TextInput";
import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import PhoneInputComponent from "../../components/PhoneInput";
import DatePickerComponent from "../../components/DatePickerComponent";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Button from "../../components/Button";
import { CreateAccountFormDataUi, FlexDirection } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useAppDispatch } from "../../redux/hooks";
import { createUser, verifySignupData } from "../../redux/slices/AuthSlice";
import { useFormik } from "formik";
import { CreateAccountSchema } from "../../https/schemas";
import { ToastContainer, toast } from "react-toastify";
import CountryPhone from "../../components/CountryPhone";
import { getCountryListMap } from "country-flags-dial-code";
import axios from "axios";
import moment from "moment";
import { IPInfoContext } from "ip-info-react";
import Dropdown from "../../components/Dropdown";

export const styles = {
  container: {
    padding: "0px 20px",
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

function SignupScreen() {
  const [step, setStep] = useState(0);
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ip, setIP] = useState<any>();
  const calculateDefaultDate = () => {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() - 18));
  };
  const [dob, setDob] = useState<any>();
  const [loader, setLoader] = useState(false);
  const [country, setCountry] = useState("Nigeria");
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");

  const getPendingRegFromStorage = JSON.parse(localStorage.getItem("userreg"));
  const [countryList, setCountryList] = useState([]);
  const userIp = useContext(IPInfoContext);

  // console.log({userIp})

  // const getData = async () => {
  //   // const res = await axios.get("https://api.ipify.org/?format=json");
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   // console.log(res);
  //   setIP(res.data);
  // };

  useEffect(() => {
    const countries1 = getCountryListMap();
    // console.log(countries1);
    let x = Array.from(Object.values(countries1));
    // console.log(x[0], "x");
    setCountryList(x);
    // getData()
  }, []);

  const initialValues: CreateAccountFormDataUi = {
    email: getPendingRegFromStorage?.email
      ? getPendingRegFromStorage?.email
      : "",
    userName: getPendingRegFromStorage?.userName
      ? getPendingRegFromStorage?.userName
      : "",
    firstName: getPendingRegFromStorage?.firstName
      ? getPendingRegFromStorage?.firstName
      : "",
    lastName: getPendingRegFromStorage?.lastName
      ? getPendingRegFromStorage?.lastName
      : "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: CreateAccountSchema,
      onSubmit: (data: CreateAccountFormDataUi) => handleSubmitData(data),
      enableReinitialize: true,
    });

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
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
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


  const countryListCode = countryList?.find((dd) => dd?.country === country);


  const handleSubmitData = async (data) => {
    if (userIp?.country_code === "US") {
      toast.error("Registration is restricted for this country", {
        position: "bottom-center",
      });
      return;
    }
    if (!country || country?.length < 1) {
      toast.error("Country is required", {
        position: "bottom-center",
      });
      return;
    }
    if (!phoneNumber || phoneNumber?.length < 1) {
      toast.error("Phone number is required", {
        position: "bottom-center",
      });
      return;
    }
    if (!dob) {
      toast.error("Date of birth is required", {
        position: "bottom-center",
      });
      return;
    }

    if (calculateDefaultDate() < dob) {
      toast.error("Date must be above 18years old", {
        position: "bottom-center",
      });
      return;
    }

    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: countryListCode?.dialCode + phoneNumber,
      country: country,
      gender: gender,
      countryIso: countryListCode?.code,
      userName: data?.userName,
      dob: moment(dob).format("YYYY-MM-DD"),
    };
    const verifyPayload = {
      email: data?.email,
      phoneNumber: countryListCode?.dialCode + phoneNumber,
      userName: data?.userName,
    };

    setLoader(true);
    try {
      var response = await dispatch(verifySignupData(verifyPayload));
      if (verifySignupData.fulfilled.match(response)) {
        localStorage.removeItem("userreg");
        localStorage.setItem("pendingData", JSON.stringify(payload));
        toast.success(response?.payload?.data?.message, {
          position: "bottom-center",
        });

        setTimeout(() => {
          setLoader(false);
          navigate("/verify");
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
  const handleTerms = () => {
    localStorage.setItem("userreg", JSON.stringify(values));
    navigate("/terms-and-conditions");
  };

 
  return (
    <div style={{ ...styles.container }}>
      <div style={{ marginTop: 10 }}>
        <BackButton />
      </div>
      {stepLevel()}

      <div>
        <h3
          style={{
            ...FONTS.h2,
            fontWeight: "bold",
            textAlign: "center",
            margin: "20px 0px",
          }}
        >
          Personal Information
        </h3>
        <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
          Let's get to know you better! Please fill in your personal details to
          complete your registration.
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          required
          value={values.firstName}
          onChangeText={handleChange("firstName")}
          errorMsg={touched.firstName ? errors.firstName : undefined}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          required
          value={values.lastName}
          onChangeText={handleChange("lastName")}
          errorMsg={touched.lastName ? errors.lastName : undefined}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          required
          value={values.email}
          onChangeText={handleChange("email")}
          errorMsg={touched.email ? errors.email : undefined}
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          required
          type="username"
          value={values.userName}
          onChangeText={handleChange("userName")}
          errorMsg={touched.userName ? errors.userName : undefined}
        />

        <div style={{ width: "100%" }}>
          <Dropdown
            label="Gender"
            required
            value={gender}
            handleSelect={(e) => setGender(e.target.value)}
            placeholder="Select Gender"
            data={[{id: "male", value: "Male"},{id: "female", value: "Female"},{id: "others", value: "Others"}]}
          />
        </div>

        <div style={{ width: "100%" }}>
          <CountryPhone
            countryList={countryList}
            country={country}
            setCountry={setCountry}
            countryNumber={phoneNumber}
            isCountryRequired
            isPhoneRequired
            setCountryNumber={setPhoneNumber}
            countryListCode={countryListCode}
          />
        </div>

        <div style={{ width: "100%" }}>
          <DatePickerComponent
            label="Date of Birth"
            placeholder="Date of Birth"
            propStyle={{ width: "100%" }}
            required
            value={dob}
            calculateDefaultDate={calculateDefaultDate}
            onChangeDate={(date) => setDob(date)}
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}
        >
          {terms ? (
            <MdCheckBox
              size={30}
              onClick={() => setTerms(!terms)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <MdCheckBoxOutlineBlank
              onClick={() => setTerms(!terms)}
              size={30}
              style={{ cursor: "pointer" }}
            />
          )}
          <p
            style={{
              ...FONTS.h6,
              margin: "0px 0px 0px 4px",
              cursor: "pointer",
              color: COLORS.gray,
            }}
            onClick={() => handleTerms()}
          >
            I agree to the <span style={{ color: COLORS.primary }}>Terms</span>{" "}
            and <span style={{ color: COLORS.primary }}>Conditions</span>.
          </p>
        </div>

        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              disabled={!terms}
              propStyle={{ width: "100%" }}
              isLoading={loader}
              // handlePress={() => navigate('/verify')}
              handlePress={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupScreen;
