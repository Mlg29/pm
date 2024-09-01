import Button from "../../components/Button";
import Header from "../../components/Header";
import profile from "../../assets/images/profile1.png";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import trash from "../../assets/images/trash.svg";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/images/edit.svg";
import TextInput from "../../components/TextInput";
import PhoneInputComponent from "../../components/PhoneInput";
import DatePickerComponent from "../../components/DatePickerComponent";
import { AccountFormDataUi, FlexDirection, Position } from "../../utils/type";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import {
  getUserData,
  updateUserData,
  uploadImage,
} from "../../redux/slices/AuthSlice";
import { useAppDispatch } from "../../redux/hooks";
import { AccountSchema } from "../../https/schemas";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import CustomFileInput from "../../components/FileInput";
import axios from "axios";
import PinModal from "../../components/Modals/PinModal";
import CountryPhone from "../../components/CountryPhone";
import { getCountryListMap } from "country-flags-dial-code";
import Dropdown from "../../components/Dropdown";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    flex: 1,
    height: "100%",
    padding: "16px",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px",
  },
  row: {
    width: "100%",
  },
  trash: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0px",
  },
  edit: {
    position: "relative" as Position,
    bottom: 20,
    left: 20,
  },
};

function EditProfile() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch() as any;
  const [userData, setUserData] = useState(null);
  const [dob, setDob] = useState(new Date());
  const fileInputRef = useRef(null);
  const [fileUrl, setFileUrl] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [storePayload, setStorePayload] = useState(null);
  const [country, setCountry] = useState("Nigeria");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [countryList, setCountryList] = useState([]);
  const countryListCode = countryList?.find((dd) => dd?.country === country);
  const phone = userData?.phoneNumber?.slice(countryListCode?.dialCode?.length);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const countries1 = getCountryListMap();
    // console.log(countries1);
    let x = Array.from(Object.values(countries1));
    // console.log(x[0], "x");
    setCountryList(x);
    setPhoneNumber(phone);
  }, [phone]);

  const handleClose = () => {
    setShow(false);
    if (isMobile) {
      navigate(-1);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      try {
        setImageLoader(true);
        const formData = new FormData();
        formData.append("file", file);
        const response = await dispatch(uploadImage(formData));
        if (uploadImage.fulfilled.match(response)) {
          setFileUrl(response?.payload?.data?.data?.link);
          setImageLoader(false);
        } else {
          var errMsg = response?.payload as string;
          setImageLoader(false);
          toast.error(errMsg, {
            position: "bottom-center",
          });
        }
      } catch (e) {
        setImageLoader(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
      setGender(response?.payload?.gender)
      setFileUrl(
        response?.payload?.profileImage ? response?.payload?.profileImage : ""
      );
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const initialValues: AccountFormDataUi = {
    email: userData?.email ? userData?.email : "",
    userName: userData?.userName ? userData?.userName : "",
    firstName: userData?.firstName ? userData?.firstName : "",
    lastName: userData?.lastName ? userData?.lastName : "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: AccountSchema,
      onSubmit: (data: AccountFormDataUi) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
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
    if (!gender || gender?.length < 1) {
      toast.error("Gender is required", {
        position: "bottom-center",
      });
      return;
    }
    const payload = {
      // ...data,
      profileImage: fileUrl ? fileUrl : "",
      phoneNumber: countryListCode?.dialCode + phoneNumber,
      gender: gender,
     // countryIso: countryListCode?.code,
      //  country: country,
      //  dob: dob?.toISOString().slice(0, 10),
    };

    setStorePayload(payload);

    setShow(true);
    return;
  };

  const handleAction = async () => {
    setLoader(true);
    try {
      var response = await dispatch(updateUserData(storePayload));
      if (response?.error?.message === "Rejected") {
        setMessage(response?.payload);
        setMessageType("Rejected");
      }
      if (updateUserData.fulfilled.match(response)) {
        setLoader(false);
        fetchUserInfo();
        // toast.success("Profile Updated Successfully", {
        //   position: "bottom-center",
        // });
        setMessage("Profile Updated Successfully");
        setMessageType("Success");
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        // toast.error(errMsg, {
        //   position: "bottom-center",
        // });
        setMessage(errMsg);
        setMessageType("Rejected");
      }
    } catch (err) {}
  };



  return (
    <div style={{ ...styles.container }}>
      {isMobile && <Header text="Edit Profile" />}

      <div style={{ display: "flex", flexDirection: "column", flex: 5 }}>
        <h3 style={{ ...FONTS.h4 }}>Personal Information</h3>
        <p style={{ ...FONTS.body6 }}>Update your personal information</p>
        <div style={{ ...styles.center }}>
          <CustomFileInput
            handleButtonClick={handleButtonClick}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            fileUrl={fileUrl}
            userData={userData}
            imageLoader={imageLoader}
          />
        </div>

        <div>
          <div style={{ ...styles.row }}>
            <TextInput
              label="First Name"
              value={values?.firstName}
              required
              placeholder="Enter First name"
              disabled
            />
          </div>
          <div style={{ ...styles.row }}>
            <TextInput
              label="Last Name"
              required
              value={values?.lastName}
              placeholder="Enter Last name"
              disabled
            />
          </div>
          <div style={{ ...styles.row }}>
            <TextInput
              label="Email"
              value={values?.email}
              required
              placeholder="Enter Email"
              disabled
            />
          </div>
          <div style={{ ...styles.row }}>
            <TextInput
              label="Username"
              value={values?.userName}
              required
              placeholder="Enter Username"
              disabled
            />
          </div>
          <div style={{ width: "100%" }}>
            <Dropdown
              label="Gender"
              required
              value={gender}
              handleSelect={(e) => setGender(e.target.value)}
              placeholder="Select Gender"
              data={[
                { id: "male", value: "Male" },
                { id: "female", value: "Female" },
                { id: "others", value: "Others" },
              ]}
              disabled={userData?.gender}
            />
          </div>
          <div style={{ ...styles.row }}>
            <CountryPhone
              countryList={countryList}
              country={country}
              setCountry={setCountry}
              countryNumber={phoneNumber}
              setCountryNumber={setPhoneNumber}
              countryListCode={countryListCode}
              isCountryRequired={false}
              isPhoneRequired={false}
              isCountryPresent={userData?.countryISO2}
            />
            {/* <PhoneInputComponent
              label="Phone Number"
              required
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined}
            /> */}
          </div>
          {/* <div style={{ ...styles.row }}>
                        <DatePickerComponent
                             label="Date of Birth"
                             propStyle={{ width: "100%" }}
                             required
                              value={dob}
                              onChangeDate={(date) => setDob(date)}
                        />
                    </div> */}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "20px",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {isMobile ? (
          <Button
            text="Save"
            isLoading={loader}
            handlePress={() => handleSubmit()}
          />
        ) : (
          <Button
            text="Save"
            isLoading={loader}
            handlePress={() => handleSubmit()}
          />
        )}
      </div>

      <PinModal
        show={show}
        handleClose={() => handleClose()}
        handleAction={handleAction}
        type={messageType === "Rejected" ? "failed" : "success"}
        responseText={message ? message : "Password Updated Successfully"}
      />

      <ToastContainer />
    </div>
  );
}

export default EditProfile;
