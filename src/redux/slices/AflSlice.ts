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
  afl: [],
};

export const getAflFixtures = createAsyncThunk(
  "afl/getAflFixtures",
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

      return `${BaseUrl}/afl/fixtures?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);





export const AflSlice = createSlice({
  name: "afl",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAflFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getAflFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.afl = action.payload;
        }
      );
    builder.addCase(getAflFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });
   
  },
});

export const aflState = (state: RootState) =>
  state.afl.afl

export default AflSlice.reducer;