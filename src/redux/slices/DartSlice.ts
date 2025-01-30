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
  "dart/getDartFixtures",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.searchTerm)
        queryParams.push(`searchTerm=${payload?.searchTerm}`);
      if (payload?.status) queryParams.push(`status=${payload?.status}`);
      if (payload?.startTime)
        queryParams.push(`time=${payload.startTime}`);
      if (payload?.date) queryParams.push(`date=${payload.date}`);
      if (payload?.page) queryParams.push(`page=${payload?.page}`);
      if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);

      const queryString = queryParams.join("&");

      return `${SportSportBaseUrl}/dart/fixtures?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);





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
