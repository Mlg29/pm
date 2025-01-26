/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import {
  getRequest,
  updateRequestWithNoPayload,
} from "../../https/server";
import { SportBaseUrl } from "../../https";

const initialState = {
  loading: false,
  notifications: [],
};

export const updateNotifications = createAsyncThunk(
  "notification/updateNotifications",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateRequestWithNoPayload(`${SportBaseUrl}/notifications/${payload?.id}/read`);
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);


export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    var response = await getRequest(`${SportBaseUrl}/notifications`);
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  }
);

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getNotifications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.notifications = action.payload;
        }
      );
    builder.addCase(getNotifications.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(updateNotifications.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        updateNotifications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      );
    builder.addCase(updateNotifications.rejected, (state, action) => {
      // state.error = action.error.message
    });
  },
});

export const notificationState = (state: RootState) => state.notification.notifications;

export default NotificationSlice.reducer;
