import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: true,
};

let socketSlice = createSlice({
    name: 'socket',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setSocketOpen: function (state, action) {
            // action.payload = socket (Object)
            state.socket = true;
        },

        /*======================================*/

        setSocketClosed: function (state, action) {
            // action.payload = socket (Object)
            state.socket = true;
        },

        /*======================================*/
    },
});
export const { setSocketOpen, setSocketClosed } = socketSlice.actions;
export default socketSlice.reducer;
