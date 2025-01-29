/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import {
  getRequest,
  postRequest,
  getRequestNoToken,
  postRequestNoToken,
  updateRequest,
  postImageRequest
} from '../../https/server'
import { SportSportBaseUrl, SportSportSportBaseUrl } from '../../https'

const initialState = {
  loading: false,
  boxingFixtures: []
}

export const getBoxingFixtures = createAsyncThunk(
  'boxing/getBoxingFixtures',
  async (payload?: any) => {
    const buildUrl = (payload?: any) => {
      let queryParams = []
      if (payload?.range) queryParams.push(`range=${payload?.range}`);
      // if (payload?.searchTerm)
      //   queryParams.push(`searchTerm=${payload?.searchTerm}`);
      // if (payload?.status) queryParams.push(`status=${payload?.status}`);
      // if (payload?.startTime)
      //   queryParams.push(`startTime=${payload.startTime}`);
      // if (payload?.date) queryParams.push(`date=${payload.date}`);
      // if (payload?.page) queryParams.push(`page=${payload?.page}`);
      // if (payload?.pageSize) queryParams.push(`pageSize=${payload?.pageSize}`);

      const queryString = queryParams.join('&')

      return `${SportSportSportBaseUrl}/boxing/${payload?.range ? `matches?${queryString}` : 'live'}`
    }

    var response = await getRequest(buildUrl(payload))
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const getBoxingMatch = createAsyncThunk(
  'boxing/getBoxingMatch',
  async (payload: any) => {
    var response = await getRequest(
      `${SportSportBaseUrl}/boxing/match/${payload?.tourId}`
    )
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const BoxingSlice = createSlice({
  name: 'boxing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoxingFixtures.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getBoxingFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.boxingFixtures = action.payload
        }
      )
    builder.addCase(getBoxingFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    })

    builder.addCase(getBoxingMatch.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getBoxingMatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
        }
      )
    builder.addCase(getBoxingMatch.rejected, (state, action) => {
      // state.error = action.error.message
    })
  }
})

export const boxingFixtureState = (state: RootState) =>
  state.boxing.boxingFixtures
export const boxingFixtureStatusState = (state: RootState) =>
  state.boxing.loading

export default BoxingSlice.reducer
