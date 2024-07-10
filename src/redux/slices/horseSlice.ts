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
  horseFixtures: [],
};

export const getHorseFixtures = createAsyncThunk(
  "horse/getHorseFixtures",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.searchTerm)
        queryParams.push(`searchTerm=${payload?.searchTerm}`);
      if (payload?.status) queryParams.push(`status=${payload?.status}`);
      if (payload?.startTime)
        queryParams.push(`startTime=${payload.startTime}`);
      if (payload?.date) queryParams.push(`date=${payload.date}`);
      if (payload?.page) queryParams.push(`page=${payload?.page}`);
      if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);

      const queryString = queryParams.join("&");

      return `${BaseUrl}/horse/fixtures?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getHorseRace = createAsyncThunk(
  "horse/getHorseRace",
  async (payload: any) => {
    var response = await getRequest(`${BaseUrl}/horse/race/${payload?.tourId}`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);



export const HorseSlice = createSlice({
  name: "horse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHorseFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getHorseFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.horseFixtures = action.payload;
        }
      );
    builder.addCase(getHorseFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(getHorseRace.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getHorseRace.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getHorseRace.rejected, (state, action) => {
      // state.error = action.error.message
    });
   
  },
});

export const tennisFixtureState = (state: RootState) =>
  state.horse.horseFixtures

export default HorseSlice.reducer;
