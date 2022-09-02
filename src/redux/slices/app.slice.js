import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    app: {
        loading: true,
        loggedIn: false,
    },
};

let appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setAppLoading: function (state) {
            state.app.loading = true;
        },
        /*================================================*/
        /*================================================*/
        setAppReady: function (state) {
            state.app.loading = false;
        },
        /*================================================*/
        /*================================================*/
        setLoggedIn: function (state) {
            state.app.loggedIn = true;
        },
        /*================================================*/
        /*================================================*/
        setLoggedOut: function (state) {
            state.app.loggedIn = false;
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { setAppLoading, setAppReady, setLoggedIn, setLoggedOut } = appSlice.actions;
export default appSlice.reducer;
