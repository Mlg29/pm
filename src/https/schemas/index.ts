/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import * as yup from "yup";
const phoneRegExp = /^(\+?\d{1,4}|\d{1,4})?\s?\d{7,14}$/;


export const LoginSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const ComingSoonSchema = yup.object().shape({
  email: yup.string()
  .required("Email is required")
  .test(
    'Must be a valid email',
    function (value) {
      const isValidEmail = yup.string().email().isValidSync(value);
      return isValidEmail;
    }
  )
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
    .min(6, ({ min }) => `Current password must be at least ${min} characters`)
    .required("Current Password is required"),
  newPassword: yup
    .string()
    .min(6, ({ min }) => `New password must be at least ${min} characters`)
    .required("New Password is required"),
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
  firstName: yup.string().matches(/^[a-zA-Z]+$/, "First name must contain only letters").required("First name is required"),
  lastName: yup.string().matches(/^[a-zA-Z]+$/, "Last name must contain only letters").required("Last name is required"),
  userName: yup.string().required("Username is required"),
  // phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Email is required"),
});


export const AccountSchema = yup.object().shape({
  firstName: yup.string().matches(/^[a-zA-Z]+$/, "First name must contain only letters").required("First name is required"),
  lastName: yup.string().matches(/^[a-zA-Z]+$/, "Last name must contain only letters").required("Last name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
});

export const SecretQuestionSchema = yup.object().shape({
  answer: yup.string().required("Answer One is required"),
  answerTwo: yup.string().required("Answer Two is required"),
  answerThree: yup.string().required("Answer Three is required"),
});

export const CreatePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, ({ min }) => `Current password must be at least ${min} characters`)
    .required("Current password is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("New password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(6, ({ min }) => `Confirm new password must be at least ${min} characters`)
    .required('Password confirmation is required'),
});
export const CreatePasswordSchemaAuth = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("New password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(6, ({ min }) => `Confirm new password must be at least ${min} characters`)
    .required('Password confirmation is required'),
});

export const MaxAmountSchema = yup.object().shape({
  amount: yup
    .string()
    .required("Amount is required"),

});


export const CreatePinSchema = yup.object().shape({
  oldPin: yup
    .string()
    .length(6,`Current Pin must be 6 characters`)
    .required("Current pin is required"),
  pin: yup
    .string()
    .length(6,`New Pin must be 6 characters`)
    .required("New pin is required"),
    confirmPin: yup
    .string()
    .oneOf([yup.ref('pin'), null], 'Pin must match')
    .length(6,`Confirm new pin must be 6 characters`)
    .required('Pin confirmation is required'),
});

export const CreatePinSchemaAuth = yup.object().shape({
  pin: yup
    .string()
    .length(6,`New Pin must be 6 characters`)
    .required("New pin is required"),
    confirmPin: yup
    .string()
    .oneOf([yup.ref('pin'), null], 'Pin must match')
    .length(6,`Confirm new pin must be 6 characters`)
    .required('Pin confirmation is required'),
});

