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
import { BaseUrl,SportBaseUrl } from "../../https";

const initialState = {
  loading: false,
  formulaFixtures: [],
};

export const getFormulaFixtures = createAsyncThunk(
  "formula/getFormulaFixtures",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.range) queryParams.push(`range=${payload?.range}`);
      const queryString = queryParams.join("&");

      return `${SportBaseUrl}/motors/f1?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);





export const FormulaSlice = createSlice({
  name: "formula",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormulaFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getFormulaFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.formulaFixtures = action.payload;
        }
      );
    builder.addCase(getFormulaFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

 
   
  },
});

export const boxingFixtureState = (state: RootState) =>
  state.formula.formulaFixtures

export default FormulaSlice.reducer;