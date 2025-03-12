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
  snooker: [],
};



export const getSnookerFixtures = createAsyncThunk(
  'snooker/getSnookerFixtures',
  async (payload?: any) => {
    const buildUrl = (payload?: any) => {
      let queryParams = []
      if (payload?.range) queryParams.push(`range=${payload?.range}`)

      const queryString = queryParams.join('&')

      return `${SportSportBaseUrl}/snooker/${payload?.range ? `matches?${queryString}` : 'live'}`
    }

    var response = await getRequest(buildUrl(payload))
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)





export const SnookerSlice = createSlice({
  name: "snooker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSnookerFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getSnookerFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.snooker = action.payload;
        }
      );
    builder.addCase(getSnookerFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const snookerState = (state: RootState) =>
  state.snooker.snooker

export default SnookerSlice.reducer;
