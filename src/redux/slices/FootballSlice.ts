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
    footballFixtures: [],
    footballEvents: []
};


export const getFootballFixtures= createAsyncThunk("football/getFootballFixtures", async (payload: any) => {
  
    const buildUrl = (payload) => {
        let queryParams = [];
        if (payload?.range) queryParams.push(`range=${payload?.range}`);
        // if (payload?.status) queryParams.push(`status=${payload?.status}`);
        // if (payload?.startTime) queryParams.push(`startTime=${payload.startTime}`);
        // if (payload?.endTime) queryParams.push(`endTime=${payload.endTime}`);
        // if (payload?.date) queryParams.push(`date=${payload.date}`);
        // if (payload?.page) queryParams.push(`page=${payload?.page}`);
        // if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);
      
        const queryString = queryParams.join('&');


        return `${SportBaseUrl}/soccer/matches?${queryString}`;
      };

    var response = await getRequest(buildUrl(payload));
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getFootballEvents= createAsyncThunk("football/getFootballEvents", async () => {
    var response = await getRequest(`${BaseUrl}/football/prefill-events`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  });


export const FootballSlice = createSlice({
  name: "football",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFootballFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getFootballFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
         state.footballFixtures= action.payload
        }
      );
    builder.addCase(getFootballFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(getFootballEvents.pending, (state, action) => {
        state.loading = true;
      }),
        builder.addCase(
          getFootballEvents.fulfilled,
          (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.footballEvents= action.payload
          }
        );
      builder.addCase(getFootballEvents.rejected, (state, action) => {
        // state.error = action.error.message
      });

  },
});

export const footballEventState = (state: RootState) => state.football.footballEvents;
export const footballFixtureState = (state: RootState) => state.football.footballFixtures;

export default FootballSlice.reducer;
