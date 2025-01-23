/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import {
    getRequest,
} from "../../https/server";
import { BaseUrl, SportBaseUrl } from "../../https";

const initialState = {
    loading: false,
    nascaFixtures: [],
};

export const getNascaFixtures = createAsyncThunk(
    "nasca/getNascaFixtures",
    async (payload: any) => {
        const buildUrl = (payload) => {
            let queryParams = [];
            if (payload?.range) queryParams.push(`${payload?.range}`);
            const queryString = queryParams.join("&");

            return `${SportBaseUrl}/nascar/${queryString}`;
        };

        var response = await getRequest(buildUrl(payload));
        if (response?.status === 200 || response?.status === 201) {
            return response?.data;
        }
    }
);
export const getNascaMatchFixtures = createAsyncThunk(
    "nasca/getNascaMatchFixtures",
    async (payload: any) => {
        const buildUrl = (payload) => {
            let queryParams = [];
            if (payload?.range) queryParams.push(`range=${payload?.range}`);
            const queryString = queryParams.join("&");

            return `${SportBaseUrl}/nascar/matches?${queryString}`;
        };

        var response = await getRequest(buildUrl(payload));
        if (response?.status === 200 || response?.status === 201) {
            return response?.data;
        }
    }
);





export const NascaSlice = createSlice({
    name: "nasca",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNascaFixtures.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(
                getNascaFixtures.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.nascaFixtures = action.payload;
                }
            );
        builder.addCase(getNascaFixtures.rejected, (state, action) => {
            // state.error = action.error.message
        });
        builder.addCase(getNascaMatchFixtures.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(
                getNascaMatchFixtures.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.nascaFixtures = action.payload;
                }
            );
        builder.addCase(getNascaMatchFixtures.rejected, (state, action) => {
            // state.error = action.error.message
        });


    },
});

export const nascaFixtureState = (state: RootState) =>
    state.nasca.nascaFixtures
export const nascaFixtureStatusState = (state: RootState) =>
    state.nasca.loading

export default NascaSlice.reducer;
