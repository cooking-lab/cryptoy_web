import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    toys : [],
    filteredToys : [],
    status : 'idle',
    error : null
}

export const getToys = createAsyncThunk('toys/getToys', async() => {
    const response = await axios.get('/toys');
    return response.data;
})

const toysSlice = createSlice({
    name : 'toys',
    initialState,
    reducers : {
        updateToysStatus : (state, action) => {
            state.status = action.payload;
        },
        updateFilteredToys : (state, action) => {
            let { auction_filter,  species_filter } = action.payload;
            let filteredValues = state.toys.filter((toy) => species_filter.includes(toy.species) && auction_filter.includes(toy.marketType));
            state.filteredToys = filteredValues;
        }
    },
    extraReducers : {
        [getToys.pending] : (state, action) => {
            state.status = 'loading';
        },
        [getToys.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.toys = state.toys.concat(action.payload);
            state.filteredToys = state.toys;
        },
        [getToys.rejected] : (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const { updateToysStatus, updateFilteredToys } = toysSlice.actions;

export default toysSlice.reducer;

export const selectAllToys = (state) => state.toys.toys;

export const selectAllFilteredToys = (state) => state.toys.filteredToys;

export const selectToyById = (state, toyId) => state.toys.toys.find((toy) => toy.id === toyId);

export const selectAllOwnerToys = (state, ownerId) => state.toys.toys.filter((toy) => toy.ownerId === ownerId);

export const selectAllOwnerToysNotMarket = (state, ownerId) => state.toys.toys.filter((toy) => toy.ownerId === ownerId && !toy.market);