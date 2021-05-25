import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    
    sellingChar : [],
}

export const getUser = createAsyncThunk('user/getUser', async() => {
    const res = await axios.get('/player');
    return res.data;
})

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : {
        [getUser.fulfilled] : (state, action) => {
            state.user = action.payload;
        }
    }
})

export default userSlice.reducer;