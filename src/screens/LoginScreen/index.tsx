import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const initialValues: LoginFormData = {
    email: "",
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
    const payload = {
      email: data?.email,
      password: data?.password,
    };

    setLoader(true);
    try {
      var response = await dispatch(login(payload));
      if (login.fulfilled.match(response)) {
       // localStorage.setItem("userData", JSON.stringify(response?.payload?.data?.user))
        localStorage.setItem("token", response?.payload?.data?.accessToken)
        toast.success(response?.payload?.data?.message, {
          position: "bottom-center"
        });

        setTimeout(() => {
          setLoader(false)
          navigate('/home')
        }, 1000)
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
          <TextInput
            label="Phone Number/Email Address"
            placeholder="Enter your Phone Number/Email Address"
            required
            value={values.email}
            onChangeText={handleChange("email")}
            errorMsg={touched.email ? errors.email : undefined}
          />

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
