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
import Dropdown from "../../components/Dropdown";
import { FlexDirection, SecretQuestionCreation } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useAppDispatch } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import { SecretQuestionSchema } from "../../https/schemas";
import { updateUserData } from "../../redux/slices/AuthSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    padding: "0px 20px",
    flex: 1,
    height: "100%",
  },
  contain: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    backgroundColor: "white",
  },
  contain2: {
    width: "90%",
    border: "none",
    background: "none",
    outline: "none",
    padding: "5px 5px",
    color: COLORS.primary,
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
  select: {
    padding: "18px 5px",
    borderRadius: 10,
    margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
    backgroundColor: "white",
    outline: "none",
    color: COLORS.primary,
    height: "50px",
  },
};

function SecretQuestion() {
  const [step, setStep] = useState(4);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState({});

  const questions = [
    {
      id: 1,
      value: "What is the name of your favorite pet?",
    },
    {
      id: 2,
      value: "What is the name of your favorite cousin?",
    },
    {
      id: 3,
      value: "What was the manufacturer name of your first car??",
    },
    {
      id: 4,
      value: "What was the name of your first childhood friend??",
    },
    {
      id: 5,
      value: "What was the first concert you attended?",
    },
  ];

  const initialValues = {
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
    question3: "",
    answer3: "",
  };

  const validationSchema = Yup.object({
    question1: Yup.string().required("Required"),
    answer1: Yup.string().required("Required"),
    question2: Yup.string().required("Required"),
    answer2: Yup.string().required("Required"),
    question3: Yup.string().required("Required"),
    answer3: Yup.string().required("Required"),
  });

  const convertToObjectArray = (data) => {
    const result = [];
    for (let i = 1; `question${i}` in data; i++) {
      result.push({
        question: data[`question${i}`],
        answer: data[`answer${i}`],
      });
    }
    return result;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const convertedArray = convertToObjectArray(values);
      const payload = {
        securityQuestions: convertedArray,
      };

      setLoader(true);
      try {
        var response = await dispatch(updateUserData(payload));

        if (updateUserData.fulfilled.match(response)) {
          setLoader(false);
          toast.success("Secret Question Updated Successfully", {
            position: "bottom-center",
          });
          setTimeout(() => {
            // navigate(-1)
            navigate("/auth-success")
          }, 1000)

        } else {
          var errMsg = response?.payload as string;
          setLoader(false);
          toast.error(errMsg, {
            position: "bottom-center",
          });
        }
      } catch (err) {}
    },
  });

  const handleSelectChange = (e, fieldName) => {
    const value = e.target.value;
    setSelectedQuestions((prevSelected) => ({
      ...prevSelected,
      [fieldName]: value,
    }));
    formik.setFieldValue(fieldName, value);
  };

  const getFilteredQuestions = (fieldName) => {
    const selectedValues = Object.values(selectedQuestions);
    return questions.filter(
      (question) =>
        selectedValues.includes(String(question.value)) ===
        (fieldName && formik.values[fieldName] === String(question.value))
    );
  };

  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        {
          isMobile &&  <div style={{ marginTop: 10 }}>
          <BackButton />
        </div>
        }
       
       <div style={{ marginBottom: 30 }}>
          <h3
            style={{
              ...FONTS.h2,
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px 0px",
            }}
          >
            Secret Question
          </h3>
          <p style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}>
            Enter questions and answers you would remember.
          </p>
        </div>
      

        <form>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ ...styles.contain, marginBottom: 10 }}>
              <label htmlFor={`question${i}`} style={{ ...FONTS.body7 }}>
                Secret Question {i}
              </label>
              <select
                style={{ ...styles.select }}
                id={`question${i}`}
                name={`question${i}`}
                onChange={(e) => handleSelectChange(e, `question${i}`)}
                value={formik.values[`question${i}`]}
                onBlur={formik.handleBlur}
              >
                <option value="">Select a question</option>
                {getFilteredQuestions(`question${i}`).map((q: any) => {
                  return (
                    <option key={q.id} value={q.name}>
                      {q.value}
                    </option>
                  );
                })}
              </select>
              {formik.touched[`question${i}`] &&
                formik.errors[`question${i}`] && (
                  <div style={{ fontSize: 10, color: "red", marginTop: 5 }}>
                    {formik.errors[`question${i}`]}
                  </div>
                )}
              <div style={{ marginBottom: 10 }}>
                <label style={{ ...FONTS.body7 }} htmlFor={`answer${i}`}>
                  Answer
                </label>
                <input
                  type="text"
                  style={{
                    ...styles.contain2,
                    color: COLORS.black,
                    border: `0.1px solid ${COLORS.gray}`,
                    padding: "15px 5px",
                    borderRadius: 10,
                    width: "100%",
                  }}
                  id={`answer${i}`}
                  name={`answer${i}`}
                  onChange={formik.handleChange}
                  value={formik.values[`answer${i}`]}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched[`answer${i}`] && formik.errors[`answer${i}`] && (
                <div style={{ fontSize: 10, color: "red", marginTop: 5 }}>
                  {formik.errors[`answer${i}`]}
                </div>
              )}
            </div>
          ))}
          {/* <button
            type={loader ? "Please wait.." : "submit"}
            style={{
              width: "100%",
              marginBottom: 30,
              backgroundColor: COLORS.primary,
              padding: 15,
            }}
          >
            Submit
          </button> */}
           <div style={{ width: "100%" }}>
            <Button
              text="Submit"
              propStyle={{ width: "100%" }}
              isLoading={loader}
              handlePress={formik.handleSubmit}
            />
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SecretQuestion;
