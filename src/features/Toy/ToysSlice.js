import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    toys : [],
    filteredToys : [],
    status : 'idle',
    error : null,
    breedingStatus : 'idle'
}

export const getToys = createAsyncThunk('toys/getToys', async() => {
    const response = await axios.get('/toys');
    return response.data;
})

export const addMarket = createAsyncThunk('toys/addMarket', async(data) => {
    const res = await axios.post('/toys/markets/register', data)
    return res;
})

export const updateMarket = createAsyncThunk('markets/updateMarket', async(data) => {
    const res = await axios.put('/toys/markets/update/'+data.toyId, data);
    return res.data;
})

export const breeding = createAsyncThunk('toys/breeding', async(data) => {
    const res = await axios.post('/toys/breeding', data);
    return res.data;
})

const toysSlice = createSlice({
    name : 'toys',
    initialState,
    reducers : {
        updateToysStatus : (state, action) => {
            state.status = action.payload;
        },
        updateFilteredToys : (state, action) => {
            let { auction_filter,  species_filter, filterPrice } = action.payload;
            if(auction_filter.includes('other')){
                auction_filter.push(undefined);
            }
            let filteredValues = state.toys.filter((toy) => {
                return species_filter.includes(toy.species) && auction_filter.includes(toy.market?.type) && (toy.market ? (toy.market.initPrice <= filterPrice[1] && toy.market.initPrice > filterPrice[0]) : true);
            });
            state.filteredToys = filteredValues;
        }
    },
    extraReducers : {
        [getToys.pending] : (state, action) => {
            state.status = 'loading';
            state.toys = [];
        },
        [getToys.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.toys = state.toys.concat(action.payload);
            state.filteredToys = state.toys;
        },
        [getToys.rejected] : (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [addMarket.fulfilled] : (state, action) => {
            const newAuction = action.payload;
            const exToy = state.toys.find(toy => toy.id === newAuction.data.toyId);
            exToy.market = newAuction.data;
            state.status = 'idle';
        },
        [addMarket.rejected] : (state, action) => {
            return action.payload;
        },
        [breeding.pending] : (state, aciton) => {
            state.breedingStatus = 'loading';
        },
        [breeding.fulfilled] : (state, action) => {
            state.breedingStatus = 'succeeded';
            state.toys = state.toys.concat(action.payload);
            state.status = 'idle';
        },
        [breeding.rejected] : (state, action) => {
            state.breedingStatus = 'failed'
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

export const selectAllOwnerToysNotMarket = (state, ownerId) => state.toys.toys.filter((toy) => toy.ownerId === ownerId && (toy.market === undefined || toy.market === null));