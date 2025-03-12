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
  dart: [],
};



export const getDartFixtures = createAsyncThunk(
  'dart/getDartFixtures',
  async (payload?: any) => {
    const buildUrl = (payload?: any) => {
      let queryParams = []
      if (payload?.range) queryParams.push(`range=${payload?.range}`)

      const queryString = queryParams.join('&')

      return `${SportSportBaseUrl}/darts/${payload?.range ? `matches?${queryString}` : 'live'}`
    }

    var response = await getRequest(buildUrl(payload))
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)






export const DartSlice = createSlice({
  name: "dart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDartFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getDartFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dart = action.payload;
        }
      );
    builder.addCase(getDartFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const dartState = (state: RootState) =>
  state.dart.dart
export const dartStatusState = (state: RootState) => state.dart.loading;
export default DartSlice.reducer;
