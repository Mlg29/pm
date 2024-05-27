/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import * as yup from "yup";
const phoneRegExp = /^(\+?\d{1,4}|\d{1,4})?\s?\d{7,14}$/;


export const LoginSchema = yup.object().shape({
  email: yup.string()
  .required("Email or phone number is required")
  .test(
    'is-valid-contact',
    'Must be a valid email or phone number',
    function (value) {
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidPhone = phoneRegExp.test(value);
      return isValidEmail || isValidPhone;
    }
  ),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
export const PhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .min(11, ({ min }) => `Phone Number must be at least ${min} characters`)
    .required("Phone Number is required"),
});
export const CompanyVerificationSchema = yup.object().shape({
  CACNumber: yup.string().required("CAC Number is required"),
  registeredName: yup.string().required("Company Name is required"),
});

export const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, ({ min }) => `Old password must be at least ${min} characters`)
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(6, ({ min }) => `New password must be at least ${min} characters`)
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .min(
      6,
      ({ min }) => `Confirm new password must be at least ${min} characters`
    )
    .required("Password is required"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, ({ min }) => `New password must be at least ${min} characters`)
    .required("Password is required"),
  confirmNewPassword: yup
    .string()
    .min(
      6,
      ({ min }) => `Confirm new password must be at least ${min} characters`
    )
    .required("Password is required"),
});

export const CreateAccountSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Email is required"),
});


export const AccountSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Email is required"),
});

export const SecretQuestionSchema = yup.object().shape({
  answer: yup.string().required("Answer One is required"),
  answerTwo: yup.string().required("Answer Two is required"),
  answerThree: yup.string().required("Answer Three is required"),
});

export const CreatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(6, ({ min }) => `Confirm new password must be at least ${min} characters`)
    .required('Password confirmation is required'),
});


export const CreatePinSchema = yup.object().shape({
  pin: yup
    .string()
    .length(6,`Pin must be 6 characters`)
    .required("pin is required"),
    confirmPin: yup
    .string()
    .oneOf([yup.ref('pin'), null], 'Pin must match')
    .length(6,`Confirm new pin must be 6 characters`)
    .required('Pin confirmation is required'),
});

