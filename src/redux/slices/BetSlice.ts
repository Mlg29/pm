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
  deleteRequest,
  deleteRequestNoPayload,
  updateRequestWithNoPayload,
  updateRequestWithPayload,
} from "../../https/server";
import { BaseUrl } from "../../https";

const initialState = {
  loading: false,
};

export const getBetById = createAsyncThunk(
  "bet/getBetById",
  async (payload: any) => {
    const buildUrl = (payload) => {
      return `${BaseUrl}/bet/$${payload}`;
    };

    var response = await getRequest(buildUrl(payload));
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getOpenBet = createAsyncThunk(
  "bet/getOpenBet",
  async (payload: any) => {
    const buildUrl = (payload) => {
      let queryParams = [];
      if (payload?.page) queryParams.push(`page=${payload?.page}`);
      if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);
      if (payload?.id) queryParams.push(`id=${payload.id}`);
      const queryString = queryParams.join("&");
      return `${BaseUrl}/bet/open?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    var response = await getRequest(
      `${BaseUrl}/bet/open?page=${payload?.page}&pageSize=${payload?.pageSize}`
    );
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const updateBetById = createAsyncThunk(
  "bet/updateBetById",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${BaseUrl}/bet/${payload?.id}`,
        payload
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const acceptBet = createAsyncThunk(
  "bet/acceptBet",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequestWithNoPayload(
        `${BaseUrl}/bet/${payload?.id}/accept`);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const adjustBet = createAsyncThunk(
  "bet/adjustBet",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequestWithPayload(`${BaseUrl}/bet/${payload?.id}`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const createBet = createAsyncThunk(
  "bet/createBet",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await postRequest(`${BaseUrl}/bet`, payload);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const deleteBet = createAsyncThunk(
  "bet/deleteBet",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await deleteRequestNoPayload(
        `${BaseUrl}/bet/${{ payload }}`
      );
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const BetSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBetById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBetById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getBetById.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getOpenBet.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getOpenBet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getOpenBet.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateBetById.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateBetById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(updateBetById.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(acceptBet.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        acceptBet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(acceptBet.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(createBet.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        createBet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(createBet.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(deleteBet.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        deleteBet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(deleteBet.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});

export default BetSlice.reducer;
