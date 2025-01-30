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
import { SportSportBaseUrl, SportSportBaseUrl } from '../../https'

const initialState = {
  loading: false,
  AussieRule: []
}

interface payloadType {
  eventType: string
  query?: string
}

export const getAussieRuleFixtures = createAsyncThunk(
  'aussieRule/getAussieRuleFixtures',
  async (payload: payloadType) => {
    const { eventType, query } = payload
    const buildUrl = () => {
      return `${SportSportBaseUrl}/afl-australian-rules/${eventType}`
    }
    var response = await getRequest(buildUrl())
    if (response?.status === 200 || response?.status === 201) {
      return response?.data
    }
  }
)

export const AussieRuleSlice = createSlice({
  name: 'aussieRule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAussieRuleFixtures.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(
        getAussieRuleFixtures.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.AussieRule = action.payload
        }
      ),
      builder.addCase(getAussieRuleFixtures.rejected, (state, action) => {
        // state.error = action.error.message
      })
  }
})

export const AussieRuleState = (state: RootState) => state.aussieRule.AussieRule
export const AussieRuleStatusState = (state: RootState) => state.aussieRule.loading

export default AussieRuleSlice.reducer
