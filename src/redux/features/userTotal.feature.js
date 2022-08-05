import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userTotal: 1
}

let userTotalSlice = createSlice({
    name: 'userTotal',
    initialState: initialState,
    reducers: {
        /*======================================*/

        set: function (state, action)
        {
            state.userTotal = action.payload
        },

        /*======================================*/

        increment: function (state, action)
        {
            state.userTotal = state.userTotal + 1;
        },

        /*======================================*/

        decrement: function (state, action)
        {
            state.userTotal = state.userTotal - 1;
        },

        /*======================================*/
    }
});
export const { set, increment, decrement } = userTotalSlice.actions;
export default userTotalSlice.reducer;