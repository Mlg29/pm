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
  loading: false,
  cricket: [],
};

interface payloadType {
  range: string
  query?: string
}

export const getCricketFixtures = createAsyncThunk(
  "cricket/getCricketFixtures",
  async (payload: payloadType) => {
    const buildUrl = (payload) => `${SportSportBaseUrl}/cricket/${payload.range}`
    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getCricketMatchFixtures = createAsyncThunk(
  "cricket/getCricketMatchFixtures",
  async (payload: payloadType) => {
    const buildUrl = (payload) => `${SportSportBaseUrl}/cricket/matches?range=${payload.range}`
    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);





export const CricketSlice = createSlice({
  name: "cricket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCricketFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getCricketFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.cricket = action.payload;
        }
      );
    builder.addCase(getCricketFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(getCricketMatchFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getCricketMatchFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.cricket = action.payload;
        }
      );
    builder.addCase(getCricketMatchFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});

export const CricketState = (state: RootState) =>
  state.cricket.cricket
export const CricketStatusState = (state: RootState) =>
  state.cricket.loading

export default CricketSlice.reducer;
