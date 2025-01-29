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
  horseFixtures: []
}

export const getHorseFixtures = createAsyncThunk(
  'horse/getHorseFixtures',
  async (payload?: any) => {
    const buildUrl = (payload) => {
      let queryParams = []
      if (payload?.range) queryParams.push(`range=${payload?.range}`)

      const queryString = queryParams.join('&')

      return `${SportSportSportBaseUrl}/horse-racing/${payload?.range ? `matches?${queryString}` : 'live'
        }`
    }

    var response = await getRequest(buildUrl(payload))
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const getHorseRace = createAsyncThunk(
  'horse/getHorseRace',
  async (payload: any) => {
    var response = await getRequest(`${SportSportBaseUrl}/horse/race/${payload?.tourId}`)
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const getHorseRaceToday = createAsyncThunk(
  'horse/getHorseRaceToday',
  async () => {
    var response = await getRequest(`${SportSportSportBaseUrl}/horse-racing/races`)
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const getHorseRaceTomorrow = createAsyncThunk(
  'horse/getHorseRaceTomorrow',
  async () => {
    var response = await getRequest(`${SportSportSportBaseUrl}/horse-racing/tomorrows`)
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const HorseSlice = createSlice({
  name: 'horse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHorseFixtures.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getHorseFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.horseFixtures = action.payload
        }
      )
    builder.addCase(getHorseFixtures.rejected, (state, action) => {
      // state.error = action.error.message
    })

    builder.addCase(getHorseRace.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getHorseRace.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
        }
      )
    builder.addCase(getHorseRace.rejected, (state, action) => { })

    builder.addCase(getHorseRaceToday.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getHorseRaceToday.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
        }
      )
    builder.addCase(getHorseRaceToday.rejected, (state, action) => { })

    builder.addCase(getHorseRaceTomorrow.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getHorseRaceTomorrow.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
        }
      )
    builder.addCase(getHorseRaceTomorrow.rejected, (state, action) => { })
  }
})

export const horseFixtureState = (state: RootState) => state.horse.horseFixtures
export const horseFixtureStatusState = (state: RootState) => state.horse.loading

export default HorseSlice.reducer
