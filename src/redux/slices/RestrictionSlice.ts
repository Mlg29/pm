/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import {
  getRequest,
  updateRequest,
  updateRequestWithNoPayload,
} from "../../https/server";
import { SportSportBaseUrl } from "../../https";

const initialState = {
  loading: false,

};

export const updateBetRestriction = createAsyncThunk(
  "restriction/updateBetRestriction",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(`${SportSportBaseUrl}/bet/max-bet-amount-restriction`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const updateBetFrequency = createAsyncThunk(
  "restriction/updateBetFrequency",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(`${SportSportBaseUrl}/bet/frequency-restriction`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);




export const RestrictionSlice = createSlice({
  name: "restriction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBetRestriction.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateBetRestriction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(updateBetRestriction.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateBetFrequency.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateBetFrequency.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(updateBetFrequency.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});


export default RestrictionSlice.reducer;
