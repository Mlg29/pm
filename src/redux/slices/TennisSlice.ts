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
import { BaseUrl, SportBaseUrl } from "../../https";

const initialState = {
  loading: false,
  tennisFixtures: [],
};

export const getTennisFixtures = createAsyncThunk(
  "tennis/getTennisFixtures",
  async (payload?: any) => {
    const buildUrl = (payload?:any) => {
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

      return `${SportBaseUrl}/tennis/live/scores?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getTennisResult = createAsyncThunk(
  "tennis/getTennisResult",
  async (payload: any) => {
    var response = await getRequest(`${BaseUrl}/tennis/result/${payload?.tourId}`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getTennisGames = createAsyncThunk(
    "tennis/getTennisGames",
    async (payload: any) => {
      var response = await getRequest(`${BaseUrl}/tennis/games/${payload?.period}`);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      }
    }
  );

export const TennisSlice = createSlice({
  name: "tennis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTennisFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getTennisFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.tennisFixtures = action.payload;
        }
      );
    builder.addCase(getTennisFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(getTennisResult.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getTennisResult.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getTennisResult.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getTennisGames.pending, (state, action) => {
        state.loading = true;
      }),
        builder.addCase(
          getTennisGames.fulfilled,
          (state, action: PayloadAction<any>) => {
            state.loading = false;
          }
        );
      builder.addCase(getTennisGames.rejected, (state, action) => {
        // state.error = action.error.message
      });
  },
});

export const tennisFixtureState = (state: RootState) =>
  state.tennis.tennisFixtures;

export default TennisSlice.reducer;
