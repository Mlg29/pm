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
  handball: [],
};


export const getHandballFixtures = createAsyncThunk(
  'handball/getHandballFixtures',
  async (payload?: any) => {
    const buildUrl = (payload?: any) => {
      let queryParams = []
      if (payload?.range) queryParams.push(`range=${payload?.range}`)

      const queryString = queryParams.join('&')

      return `${SportSportBaseUrl}/handball/${payload?.range ? `matches?${queryString}` : 'live'}`
    }

    var response = await getRequest(buildUrl(payload))
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)






export const HandballSlice = createSlice({
  name: "handball",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHandballFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getHandballFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.handball = action.payload;
        }
      );
    builder.addCase(getHandballFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const handballState = (state: RootState) =>
  state.handball.handball

export default HandballSlice.reducer;
