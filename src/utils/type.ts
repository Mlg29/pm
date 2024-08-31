

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';


export type TextAlign = "left" | "right" | "center"

export type OverflowX = "scroll" | "visible" | "hidden" | "auto"

export type ObjectFit = "contain" | "cover"

export type Position = "absolute" | "relative"

export type Wrap = "wrap" | 'no-wrap'

export type OverflowY = "scroll" | "visible" | "hidden" | "auto"

/* eslint-disable prettier/prettier */

export type ButtonType = {
    children: string;
    isLoading?: boolean;
    handlePress?: () => void;
    type?: string;
    disabled?: boolean;
  };
  
  export type LoginFormData = {
    password: string;
  };
  export type ComingSoonData = {
    email: string;
  };

  export type CompanyVerificationFormData = {
    CACNumber: string;
    registeredName: string;
  };
  
  export type UsdFormData = {
    beneficiaryName: string;
    beneficiaryAddress: string;
    bankName: string;
    bankAccount: string;
    swiftCode: string;
    beneficiaryEmail: string;
    phoneNumber: string;
  };
  
  export type ButtonProps = {
    title: string;
    isLoading?: boolean;
    outlined?: any;
    style?: any;
    containerStyle?: any;
    small?: any;
    rest?: any;
    colored?: boolean;
    handlePress?: (data?: any) => void;
  };
  
  export type changePasswordData = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  
  export type ResetPasswordData = {
    newPassword: string;
    confirmNewPassword: string;
  };
  
  export type CreateAccountFormDataUi = {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
  };

  export type AccountFormDataUi = {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
  };

  export type PasswordCreation = {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  };
  export type PasswordCreationAuth = {
    password: string;
    confirmPassword: string;
  };
  export type MaxAmount = {
    amount: string;
  };

  export type SecretQuestionCreation = {
    answer: string;
    answerTwo: string;
    answerThree: string;
  };

  export type PinCreation = {
    oldPin: string;
    pin: string;
    confirmPin: string;
  };

  export type PinCreationAuth = {
    pin: string;
    confirmPin: string;
  };


  export type ForgetPasswordFormData = {
    email: string;
  };
  
  export type PhoneNumberData = {
    phone: string;
  };
  