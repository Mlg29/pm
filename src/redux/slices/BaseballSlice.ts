
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
  baseballFixtures: [],
};

export const getBaseballFixtures = createAsyncThunk(
  "baseball/getBaseballFixtures",
  async (payload?: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.range) queryParams.push(`range=${payload?.range}`);
      // if (payload?.searchTerm)
      //   queryParams.push(`searchTerm=${payload?.searchTerm}`);
      // if (payload?.status) queryParams.push(`status=${payload?.status}`);
      // if (payload?.startTime)
      //   queryParams.push(`startTime=${payload.startTime}`);
      // if (payload?.date) queryParams.push(`date=${payload.date}`);
      // if (payload?.page) queryParams.push(`page=${payload?.page}`);
      // if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);

      const queryString = queryParams.join("&");

      return `${SportSportBaseUrl}/baseball/${payload?.range ? `matches?${queryString}` : 'live'}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);



export const BaseballSlice = createSlice({
  name: "baseball",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBaseballFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBaseballFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.baseballFixtures = action.payload;
        }
      );
    builder.addCase(getBaseballFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const BaseballFixtureState = (state: RootState) =>
  state.baseball.baseballFixtures
export const BaseballFixtureeStatusState = (state: RootState) => state.baseball.loading;

export default BaseballSlice.reducer;