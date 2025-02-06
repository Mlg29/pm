
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import {
  getRequest,
  postRequest,
  getRequestNoToken,
  postRequestNoToken,
  updateRequest,
  postImageRequest,
} from "../../https/server";
import { SportSportBaseUrl } from "../../https";

const initialState = {
  userData: null,
  userInfo: null,
  loading: false,
  isFirstLaunch: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/auth/register`,
        payload
      );

      if (response?.status === 200 || response?.status === 201) {
        await localStorage.setItem(
          "userData",
          JSON.stringify(response?.data?.data)
        );
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const createNewPassword = createAsyncThunk(
  "auth/createNewPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${SportSportBaseUrl}/users/password`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const createForgotPassword = createAsyncThunk(
  "auth/createForgotPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `${SportSportBaseUrl}/auth/reset-password`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);


export const emailWaitList = createAsyncThunk(
  "auth/emailWaitList",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/email-waitlist`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const verifyTransactionPin = createAsyncThunk(
  "auth/verifyTransactionPin",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `${SportSportBaseUrl}/users/validate/transaction-pin`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const verifySignupData = createAsyncThunk(
  "auth/verifySignupData",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/auth/verify-signup-data`,
        payload
      );

      if (response?.status === 200 || response?.status === 201) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  "auth/verifyEmailOtp",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/auth/verify-email-otp`,
        payload
      );

      if (response?.status === 200 || response?.status === 201) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/auth/forgot-password`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        // await localStorage.setItem(
        //   'userData',
        //   JSON.stringify(response?.data?.data),
        // );
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequestNoToken(
        `${SportSportBaseUrl}/auth/login`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
  var response = await getRequest(`${SportSportBaseUrl}/users/profile`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getSingleUser = createAsyncThunk("auth/getSingleUser", async (payload: any) => {
  var response = await getRequest(`${SportSportBaseUrl}/users?search=${payload}`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const uploadImage = createAsyncThunk(
  "auth/uploadImage",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await postImageRequest(
        `${SportSportBaseUrl}/file`,
        formData
      );
      if (response?.status === 200 || response?.status === 201) {
        return response
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${SportSportBaseUrl}/users`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const updateTransactionPin = createAsyncThunk(
  "auth/updateTransactionPin",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${SportSportBaseUrl}/users/transaction-pin`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);


export const changeTransactionPins = createAsyncThunk(
  "auth/changeTransactionPins",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${SportSportBaseUrl}/users/change-transaction-pin`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);


export const terminateAccount = createAsyncThunk(
  "auth/terminateAccount",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `${SportSportBaseUrl}/users/account/terminate`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);


export const AccountPayout = createAsyncThunk(
  "auth/AccountPayout",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        `${SportSportBaseUrl}/users/payout-account`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const getUserPayout = createAsyncThunk("auth/getUserPayout", async () => {
  var response = await getRequest(`${SportSportBaseUrl}/users/payout-account`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});


export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(createUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(createNewPassword.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createNewPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(createNewPassword.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(createForgotPassword.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createForgotPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(createForgotPassword.rejected, (state, action) => {
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
        }
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
        }
      );
    builder.addCase(verifyEmailOtp.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.userInfo = action.payload
      });
    builder.addCase(login.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyTransactionPin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(verifyTransactionPin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.userInfo = action.payload
      });
    builder.addCase(verifyTransactionPin.rejected, (state, action) => {
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
        }
      );
    builder.addCase(forgetPassword.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getUserData.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.userInfo = action?.payload

        }
      );
    builder.addCase(getUserData.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getSingleUser.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getSingleUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(getSingleUser.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateUserData.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(updateUserData.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(emailWaitList.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        emailWaitList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(emailWaitList.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateTransactionPin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateTransactionPin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(updateTransactionPin.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(changeTransactionPins.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        changeTransactionPins.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(changeTransactionPins.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(uploadImage.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        uploadImage.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(uploadImage.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(terminateAccount.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        terminateAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(terminateAccount.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(AccountPayout.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        AccountPayout.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(AccountPayout.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getUserPayout.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getUserPayout.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = action.payload
        }
      );
    builder.addCase(getUserPayout.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },

});

export const loginState = (state: RootState) => state.auth.userData;

export const userState = (state: RootState) => state.auth.userInfo;
export const authState = (state: RootState) => state.auth;

export default AuthSlice.reducer;
