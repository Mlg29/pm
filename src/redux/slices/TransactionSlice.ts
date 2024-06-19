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
  },
});

export const footballEventState = (state: RootState) =>
  state.football.footballEvents;
export const footballFixtureState = (state: RootState) =>
  state.football.footballFixtures;

export default TransactionSlice.reducer;
