import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
};

let loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setLoggedIn: function (state) {
            state.loggedIn = true;
        },
        /*================================================*/
        /*================================================*/
        setLoggedOut: function (state) {
            state.loggedIn = false;
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { setLoggedIn, setLoggedOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;
