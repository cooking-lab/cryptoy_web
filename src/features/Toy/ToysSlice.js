import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    toys : [],
    status : 'idle',
    error : null
}

const initFilter = {
    auctionType : [],
    species : ["robot", "doll"],
    maxPrice : 1000
}

export const getToys = createAsyncThunk('toys/getToys', async(filter=initFilter) => {
    const response = await axios.get('/toys', {params : filter});
    return response.data;
})

const toysSlice = createSlice({
    name : 'toys',
    initialState,
    reducers : {
        updateToysStatus : (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers : {
        [getToys.pending] : (state, action) => {
            state.status = 'loading';
        },
        [getToys.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.toys = state.toys.concat(action.payload);
        },
        [getToys.rejected] : (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const { updateToysStatus } = toysSlice.actions;

export default toysSlice.reducer;

export const selectAllToys = (state) => state.toys.toys;

export const selectToyById = (state, toyId) => state.toys.toys.find((toy) => toy.id === toyId);

export const selectAllOwnerToys = (state, ownerId) => state.toys.toys.filter((toy) => toy.ownerId === ownerId);

export const selectAllOwnerToysNotMarket = (state, ownerId) => state.toys.toys.filter((toy) => toy.ownerId === ownerId && !toy.market);