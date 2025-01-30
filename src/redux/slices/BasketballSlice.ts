
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
import { SportSportBaseUrl, SportSportBaseUrl } from "../../https";

const initialState = {
  loading: false,
  basketballFixtures: [],
};

export const getBasketballFixtures = createAsyncThunk(
  "basketball/getBasketballFixtures",
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

      return `${SportSportBaseUrl}/basketball/${payload?.range ? `matches?${queryString}` : 'live'}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);



export const BasketballSlice = createSlice({
  name: "basketball",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBasketballFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBasketballFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.basketballFixtures = action.payload;
        }
      );
    builder.addCase(getBasketballFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const BasketballFixtureState = (state: RootState) =>
  state.basketball.basketballFixtures
export const BasketballFixtureeStatusState = (state: RootState) => state.basketball.loading;

export default BasketballSlice.reducer;
