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
import { SportSportBaseUrl } from '../../https'

const initialState = {
    loading: false,
    tennisFixtures: []
}

export const getTableTennisFixtures = createAsyncThunk(
    'tableTennis/getTennisFixtures',
    async (payload?: any) => {
        const buildUrl = (payload?: any) => {
            let queryParams = []
            if (payload?.range) queryParams.push(`range=${payload?.range}`)


            const queryString = queryParams.join('&')

            return `${SportSportBaseUrl}/table-tennis/${payload?.range ? `matches?${queryString}` : 'live'}`
        }

        var response = await getRequest(buildUrl(payload))
        if (response?.status === 200 || response?.status === 201) {
            return response?.data
        }
    }
)



export const TableTennisSlice = createSlice({
    name: 'tableTennis',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTableTennisFixtures.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(
                getTableTennisFixtures.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false
                    state.tennisFixtures = action.payload
                }
            )
        builder.addCase(getTableTennisFixtures.rejected, (state, action) => {
            // state.error = action.error.message
        })

    }
})

export default TableTennisSlice.reducer
