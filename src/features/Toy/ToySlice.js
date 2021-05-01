import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    toy : null,
    status : 'idle'
}

export const getToy = createAsyncThunk('toys/getToy', async(toyId) => {
    const res = await axios.get('/toys/'+ toyId);
    return res.data;
})

const toySlice = createSlice({
    name : 'toy',
    initialState,
    reducers : {},
    extraReducers : {
        [getToy.pending] : (state, action) => {
            state.status = 'loading';
        },
        [getToy.fulfilled] : (state, action) => {
            state.toy = action.payload;
            state.status = 'successed';
        }
    }
})

export default toySlice.reducer;
