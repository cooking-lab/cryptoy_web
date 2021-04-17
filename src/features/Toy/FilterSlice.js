const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const filterSlice = createSlice({
    name : filter,
    initialState,
    reducers : {
        filter_by_species : (state, action) => {
            
        }
    }
})

export default filterSlice.reducer;