import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    user : null,
    toys : []
    //admin : false
}

export const getUser = createAsyncThunk('user/getUser', async() => {
    const res = await axios.get('/player');
    return res.data;
})

export const getUserToys = createAsyncThunk('user/getUserToys', async(userId) => {
    const res = await axios.get('/toys/owners/'+ userId);
    return res.data;
})

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        postToy : (state, action) => {
            state.toys.push(action.payload);
        }
    },
    extraReducers : {
        [getUser.fulfilled] : (state, action) => {
            state.user = action.payload;
        },
        [getUserToys.fulfilled] : (state, action) => {
            state.toys = action.payload;
        }
    }
})

export const { postToy } = userSlice.actions;

export const getUserToysNotMarket = (state) => state.user.toys.filter(toy => toy.market === null || toy.market === undefined);

export default userSlice.reducer;