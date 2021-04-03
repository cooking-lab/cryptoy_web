import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    markets : [],
    status : "idle",
    error : null
};

export const getMarkets = createAsyncThunk('markets/getMarkets', async() => {
    const res = await axios.get('/toys/markets');
    return res.data;
});

export const addMarket = createAsyncThunk('markets/registerMarket', async(data) => {
    const res = await axios.post('/toys/markets/register', data)
    return res;
})

const marketsSlice = createSlice({
    name : 'markets',
    initialState,
    reducers : {
        updateMarketsStatus : (state, action) => state.status = action.payload
    },
    extraReducers :{
        [getMarkets.fulfilled] : (state, action) => {
            state.markets = state.markets.concat(action.payload);
            state.status = 'succeeded';
        },
        [addMarket.fulfilled] : (state, action) => {
            const { data } = action.payload;
            state.markets = state.markets.concat(data);
        },
        [addMarket.rejected] : (state, action) => {
            return action.payload;
        }
    }
})

export const { updateMarketsStatus } = marketsSlice.actions;

export default marketsSlice.reducer;

export const selectMarketById = (state, toyId) => state.markets.markets.find((auction) => auction.toyId === toyId);