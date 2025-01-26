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
import { SportBaseUrl } from "../../https";

const initialState = {
  loading: false,
};

export const getBetById = createAsyncThunk(
  "bet/getBetById",
  async (payload: any) => {
    var response = await getRequest(`${SportBaseUrl}/bet/${payload}`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const getAdjustBet = createAsyncThunk(
  "bet/getAdjustBet",
  async (payload: any) => {
    var response = await getRequest(`${SportBaseUrl}/bet/adjustment/${payload}`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);


export const getBetHistory = createAsyncThunk(
  "bet/getBetHistory",
  async (payload: any) => {

    var response = await getRequest(`${SportBaseUrl}/bet/history?status=${payload?.status}`)

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
      if (payload?.id) queryParams.push(`sportEventId=${payload.id}`);
      if (payload?.outcome) queryParams.push(`outcome=${payload.outcome}`);
      const queryString = queryParams.join("&");
      return `${SportBaseUrl}/bet/open?${queryString}`;
    };

    var response = await getRequest(buildUrl(payload));
    var response = await getRequest(
      `${SportBaseUrl}/bet/open?page=${payload?.page}&pageSize=${payload?.pageSize}`
    );
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const updateBetAdjust = createAsyncThunk(
  "bet/updateBetAdjust",
  async (payload: any, { rejectWithValue }) => {
    const pp = {
      status: payload?.status
    }

    try {
      const response = await updateRequestWithPayload(`${SportBaseUrl}/bet/adjust/${payload?.requestId}`, pp);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

export const updateBetById = createAsyncThunk(
  "bet/updateBetById",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequest(
        `${SportBaseUrl}/bet/${payload?.id}`,
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
    const adPayload = {
      betAmount: payload?.betAmount,
      prediction: payload?.prediction
    }

    try {
      const response = await updateRequestWithPayload(
        `${SportBaseUrl}/bet/${payload?.id}/accept`, adPayload);
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
    const pp = {
      betId: payload?.betId,
      requestedAmount: payload?.requestedAmount,
      requestedPrediction: payload?.requestedPrediction,
    }
    try {
      const response = await postRequest(`${SportBaseUrl}/bet/adjust`, pp);
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
      const response = await postRequest(`${SportBaseUrl}/bet`, payload);
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
        `${SportBaseUrl}/bet/${{ payload }}`
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
    builder.addCase(getBetHistory.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getBetHistory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getBetHistory.rejected, (state, action) => {
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
    builder.addCase(getAdjustBet.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getAdjustBet.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(getAdjustBet.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateBetAdjust.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateBetAdjust.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(updateBetAdjust.rejected, (state, action) => {
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

export const BetStatusState = (state: RootState) => state.bet.loading;
export default BetSlice.reducer;
