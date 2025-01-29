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
import { SportSportBaseUrl, SportSportSportBaseUrl } from "../../https";

const initialState = {
  loading: false,
  footballFixtures: [],
  footballEvents: []
};


export const getFootballFixtures = createAsyncThunk("football/getFootballFixtures", async (payload?: any) => {

  const buildUrl = (payload) => {
    let queryParams = [];
    if (payload?.range) queryParams.push(`range=${payload?.range}`);
    // if (payload?.status) queryParams.push(`status=${payload?.status}`);
    // if (payload?.startTime) queryParams.push(`startTime=${payload.startTime}`);
    // if (payload?.endTime) queryParams.push(`endTime=${payload.endTime}`);
    // if (payload?.date) queryParams.push(`date=${payload.date}`);
    // if (payload?.page) queryParams.push(`page=${payload?.page}`);

    const queryString = queryParams.join('&');


    return `${SportSportSportBaseUrl}/soccer/${payload?.range ? `matches?${queryString}` : 'live'}`;
  };

  var response = await getRequest(buildUrl(payload));
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getFootballEvents = createAsyncThunk("football/getFootballEvents", async () => {
  var response = await getRequest(`${SportSportSportBaseUrl}/football/prefill-events`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getLogo = createAsyncThunk("football/getLogo", async (payload: any) => {
  var response = await getRequest(`${SportSportSportBaseUrl}/soccer/logo?teamId=${payload.teamId}`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getStat = createAsyncThunk("football/getStat", async (payload: any) => {
  var response = await getRequest(`${SportSportSportBaseUrl}/soccer/stats?teamId=${payload.teamId}`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});

export const getMatchStat = createAsyncThunk("football/getMatchStat", async (payload: any) => {
  var response = await getRequest(`${SportSportSportBaseUrl}/soccer/match-stats?matchId=${payload.matchId}&leagueId=${payload.leagueId}`);
  if (response?.status === 200 || response?.status === 201) {
    return response?.data;
  }
});


export const FootballSlice = createSlice({
  name: "football",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFootballFixtures.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getFootballFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.footballFixtures = action.payload
        }
      );
    builder.addCase(getFootballFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    });

    builder.addCase(getFootballEvents.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getFootballEvents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.footballEvents = action.payload
        }
      );
    builder.addCase(getFootballEvents.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getLogo.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getLogo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

        }
      );
    builder.addCase(getLogo.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getStat.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getStat.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

        }
      );
    builder.addCase(getStat.rejected, (state, action) => {
      // state.error = action.error.message
    });
    builder.addCase(getMatchStat.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(
        getMatchStat.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

        }
      );
    builder.addCase(getMatchStat.rejected, (state, action) => {
      // state.error = action.error.message
    });

  },
});

export const footballEventState = (state: RootState) => state.football.footballEvents;
export const footballFixtureState = (state: RootState) => state.football.footballFixtures;
export const footballFixtureStatusState = (state: RootState) => state.football.loading;

export default FootballSlice.reducer;
