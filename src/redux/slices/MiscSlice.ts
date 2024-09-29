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

export const getFxRate = createAsyncThunk(
  "misc/getFxRate",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.sourceCurrency)
        queryParams.push(`sourceCurrency=${payload?.sourceCurrency}`);
      if (payload?.destinationCurrency)
        queryParams.push(`destinationCurrency=${payload?.destinationCurrency}`);
      if (payload?.amount) queryParams.push(`amount=${payload.amount}`);

      const queryString = queryParams.join("&");

      return `${BaseUrl}/misc/fx-rates?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getTransferRate = createAsyncThunk(
  "misc/getTransferRate",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.sourceCurrency)
        queryParams.push(`sourceCurrency=${payload?.sourceCurrency}`);
      if (payload?.destinationCurrency)
        queryParams.push(`destinationCurrency=${payload?.destinationCurrency}`);
      if (payload?.amount) queryParams.push(`amount=${payload.amount}`);

      const queryString = queryParams.join("&");

      return `${BaseUrl}/misc/transfer-rates?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getBankList = createAsyncThunk(
  "misc/getBankList",
  async () => {
    const buildUrl = () => {

      return `${BaseUrl}/misc/banks`;
    };
    var response = await getRequest(buildUrl());
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getBankBranch = createAsyncThunk(
  "misc/getBankBranch",
  async (payload: any) => {
    const buildUrl = (payload) => {

      return `${BaseUrl}/misc/banks/${payload?.id}/branches`;
    };
    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);


export const verifyBank = createAsyncThunk(
  "misc/verifyBank",
  async (payload: any, { rejectWithValue }) => {
    
    try {
      const response = await postRequest(`${BaseUrl}/misc/resolve-bank-account`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const MiscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFxRate.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getFxRate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getFxRate.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getTransferRate.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getTransferRate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getTransferRate.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getBankList.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBankList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getBankList.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getBankBranch.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBankBranch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getBankBranch.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(verifyBank.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        verifyBank.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(verifyBank.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});

// export const miscState = (state: RootState) =>
//   state.misc.afl

export default MiscSlice.reducer;
