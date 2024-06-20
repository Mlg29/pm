import { COLORS } from "../../utils/colors";
import { ComingSoonData, FlexDirection } from "../../utils/type";
import miniLogo from "../../assets/images/miniLogo.svg";
import { FONTS } from "../../utils/fonts";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { useFormik } from "formik";
import { ComingSoonSchema } from "../../https/schemas";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { emailWaitList } from "../../redux/slices/AuthSlice";

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
    margin: "20px 0px 10px 0px",
  },
};

const ComingSoon = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const initialValues: ComingSoonData = {
    email: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ComingSoonSchema,
      onSubmit: (data: ComingSoonData) => handleSubmitData(data),
      enableReinitialize: true,
    });

  const handleSubmitData = async (data) => {
    const payload = {
      email: data?.email,
    };
    setLoader(true)
    const response = await dispatch(emailWaitList(payload))
    if(emailWaitList.fulfilled.match(response)){
      setLoader(false)
      navigate('/coming-soon-success')
      // toast.success("Congratulations, we will have you updated", {
      //   position: "bottom-center"
      // });
    }
    else {
      var errMsg = response?.payload as string;
      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
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
            Coming Soon
          </h3>
          <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
            Be the first to try it out
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <TextInput
            label="Email Address"
            placeholder="Enter your Email Address"
            required
            value={values.email}
            onChangeText={handleChange("email")}
            errorMsg={touched.email ? errors.email : undefined}
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
            <Button
              text="Get Notified"
              propStyle={{ width: "100%" }}
              isLoading={loader}
              handlePress={() => handleSubmit()}
            />
          </div>


        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ComingSoon;
