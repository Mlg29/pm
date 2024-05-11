
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import {getRequest, postRequest, getRequestNoToken, postRequestNoToken} from '../../https/server';
import { BaseUrl } from '../../https';


const initialState = {
  userData: null,
  userInfo: null,
  loading: false,
  isFirstLaunch: false,
  error: null,
};




export const createUser = createAsyncThunk(
  'auth/createUser',
  async (payload: any, {rejectWithValue}) => {


    try {
      const response = await postRequestNoToken(
        `${BaseUrl}/auth/signup`,
        payload,
      );
      console.log("res=====",{response})
      if (response?.status === 200) {
        await localStorage.setItem(
          'userData',
          JSON.stringify(response?.data?.data),
        );
        return response?.data?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const verifySignupData = createAsyncThunk(
  'auth/verifySignupData',
  async (payload: any, {rejectWithValue}) => {


    try {
      const response = await postRequestNoToken(
        `${BaseUrl}/auth/verify-signup-data`,
        payload,
      );
      console.log({response})
      if (response?.status === 200) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const verifyEmailOtp = createAsyncThunk(
  'auth/verifyEmailOtp',
  async (payload: any, {rejectWithValue}) => {


    try {
      const response = await postRequestNoToken(
        `${BaseUrl}/auth/verify-email-otp`,
        payload,
      );
      console.log("res=====",{response})
      if (response?.status === 200) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response?.data?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (payload: any, {rejectWithValue}) => {


    try {
      const response = await postRequestNoToken(
        `${BaseUrl}/auth/forgot-password`,
        payload,
      );
      console.log("res=====",{response})
      if (response?.status === 200) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response?.data?.data;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload: any, {rejectWithValue}) => {


    try {
      const response = await postRequestNoToken(
        `${BaseUrl}/auth/login`,
        payload,
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

// export const verifyEmailSend = createAsyncThunk(
//   'auth/verifyEmailSend',
//   async (payload: string) => {
//     const response = await getRequest(
//       `${config.api_base_url}/users/email-address/verify?emailAddress=${payload}`,
//     );
//     if (response?.status === 200) {
//       return response?.data?.data;
//     }
//   },
// );

// export const verifyEmail = createAsyncThunk(
//   'auth/verifyEmail',
//   async (payload: {token: string; email: string}) => {
//     const response = await getRequest(
//       `${config.api_base_url}/users/email-address/verify?emailAddress=${payload?.email}&hasVerificationToken=true&verificationToken=${payload.token}`,
//     );
//     if (response?.status === 200) {
//       var profile = await AsyncStorage.getItem('keepInfo').then((req: any) =>
//         JSON.parse(req),
//       );
//       await AsyncStorage.setItem('userInfo', JSON.stringify(profile));
//       if (profile?.accessToken) {
//         await AsyncStorage.setItem('token', profile?.accessToken);
//       }
//       return profile;
//     }
//   },
// );


// export const verifyPhoneNumberOtp = createAsyncThunk(
//   'auth/verifyPhoneNumberOtp',
//   async (payload: {token: string; phoneNumber: string; pin: string}) => {
//     const response = await getRequest(
//       `${config.api_base_url}/users/phone-number/verify?phoneNumber=${payload?.phoneNumber}&hasVerificationToken=true&token=${payload?.token}&pin=${payload?.pin}`,
//     );
//     if (response?.status === 200) {
//       return response?.data;
//     }
//   },
// );



// export const deleteUserAccount = createAsyncThunk(
//   'auth/deleteUserAccount',
//   async (payload: {id: string}) => {
//     const response = await getRequest(
//       `${config.api_base_url}/users/${payload?.id}`,
//     );
//     if (response?.status === 200) {
//       return response?.data;
//     }
//   },
// );



// export const signOutUser = createAsyncThunk('auth/signout', async () => {
//   try {
//     return null;
//   } catch (e: any) {
//     return console.log(e);
//   }
// });

// export const signInUser = createAsyncThunk(
//   'auth/signin',
//   async (payload: LoginFormData, {rejectWithValue}) => {
//     try {
//       console.log(config.api_base_url);
//       const response = await postRequest(
//         `${config.api_base_url}/auth/sign-in/user?clientType=mobile`,
//         payload,
//       );

//       console.log(response?.data);
//       if (response?.status === 200) {
//         return response?.data;
//       }
//     } catch (e: any) {
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );

// export const getProfile = createAsyncThunk('auth/getProfile', async () => {
//   try {
//     var profile = await AsyncStorage.getItem('userInfo').then((req: any) =>
//       JSON.parse(req),
//     );
//     return profile;
//   } catch (e: any) {}
// });

// export const getUserDetail = createAsyncThunk(
//   'auth/getUserDetail',
//   async () => {
//     try {
//       const response = await getRequest(`${config.api_base_url}/users/details`);
//       if (response?.status === 200) {
//         await AsyncStorage.setItem(
//           'userInfo',
//           JSON.stringify(response?.data?.data),
//         );
//         return response?.data?.data;
//       }
//     } catch (e: any) {}
//   },
// );

// export const updateProfile = createAsyncThunk(
//   'auth/updateProfile',
//   async (
//     payload: {
//       dateOfBirth: string;
//       gender: string;
//       country: string;
//       houseAddress: string;
//       userId: string;
//       image: string;
//     },
//     {rejectWithValue},
//   ) => {
//     try {
//       const data = {
//         dateOfBirth: payload?.dateOfBirth,
//         gender: payload?.gender,
//         country: payload?.country,
//         homeAddress: payload?.houseAddress,
//         image: payload?.image,
//       };
//       const response = await postRequest(
//         `${config.api_base_url}/users/${payload?.userId}/update`,
//         data,
//       );
//       if (response?.status === 200) {
//         await AsyncStorage.setItem(
//           'userInfo',
//           JSON.stringify(response?.data?.data),
//         );
//         return response?.data;
//       }
//     } catch (e: any) {
//       console.log({e}, e.toJSON());
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );



// export const changePassword = createAsyncThunk(
//   'auth/changePassword',
//   async (
//     payload: {currentPassword: string; newPassword: string},
//     {rejectWithValue},
//   ) => {
//     try {
//       const response = await postRequest(
//         `${config.api_base_url}/users/change-password`,
//         payload,
//       );

//       if (response?.status === 200) {
//         return response?.data;
//       }
//     } catch (e: any) {
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (payload: {emailAddress: string}, {rejectWithValue}) => {
//     try {
//       const response = await getRequest(
//         `${config.api_base_url}/users/password/reset?emailAddress=${payload.emailAddress}`,
//       );

//       if (response?.status === 200) {
//         return response?.data;
//       }
//     } catch (e: any) {
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );

// export const changePin = createAsyncThunk(
//   'auth/changePin',
//   async (payload: {pin: string; password: string}, {rejectWithValue}) => {
//     try {
//       const response = await postRequest(
//         `${config.api_base_url}/users/set/transaction-pin`,
//         payload,
//       );

//       if (response?.status === 200) {
//         return response?.data;
//       }
//     } catch (e: any) {
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );

// export const updatePin = createAsyncThunk(
//   'auth/updatePin',
//   async (payload: {pin: string; password: string}, {rejectWithValue}) => {
//     try {
//       const response = await postRequest(
//         `${config.api_base_url}/users/change/transaction-pin`,
//         payload,
//       );

//       if (response?.status === 200) {
//         return response?.data;
//       }
//     } catch (e: any) {
//       return rejectWithValue(e?.response?.data?.message);
//     }
//   },
// );

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(createUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifySignupData.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifySignupData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(verifySignupData.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyEmailOtp.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifyEmailOtp.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(verifyEmailOtp.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        login.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(login.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(forgetPassword.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        forgetPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        },
      );
    builder.addCase(forgetPassword.rejected, (state, action) => {
      // state.error = action.error.message
    });
  
  },
});

export const loginState = (state: RootState) => state.auth.userData;

export const userState = (state: RootState) => state.auth.userInfo;
export const authState = (state: RootState) => state.auth;


export default AuthSlice.reducer;