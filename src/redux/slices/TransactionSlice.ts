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
import { BaseUrl } from "../../https";

const initialState = {
  loading: false,
  transactions: [],
};

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${BaseUrl}/transactions`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const requestNewPin = createAsyncThunk(
  "transaction/requestNewPin",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${BaseUrl}/users/transaction-pin/reset-otp/request`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const resetPin = createAsyncThunk(
  "transaction/resetPin",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${BaseUrl}/users/transaction-pin/reset`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async () => {
    var response = await getRequest(`${BaseUrl}/transactions/history`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getTransactions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      );
    builder.addCase(getTransactions.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(createTransaction.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(createTransaction.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(resetPin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        resetPin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(resetPin.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(requestNewPin.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        requestNewPin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(requestNewPin.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});


export default TransactionSlice.reducer;
