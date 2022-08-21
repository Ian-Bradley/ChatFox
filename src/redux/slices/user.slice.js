import { createSlice } from '@reduxjs/toolkit';
import { generateRandomName, generateRandomColor } from 'Util/helpers/functions.js';

const initialState = {
    user: {
        id: 0,
        name: generateRandomName(true),
        nickname: generateRandomName(false),
        color: generateRandomColor(),
        loggedIn: false,
    },
    isLoading: false,
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /*======================================*/

        getUserFetch: function (state, action) {
            state.isLoading = true;
        },

        /*======================================*/

        getUserSuccess: function (state, action) {
            // action.payload = user (Object)
            state.user = action.payload;
            state.isLoading = false;
        },

        /*======================================*/

        getUserFailure: function (state, action) {
            state.isLoading = false;
        },

        /*======================================*/

        setID: function (state, action) {
            // action.payload = id (String)
            state.user.id = action.payload;
        },

        /*======================================*/

        setName: function (state, action) {
            // action.payload = name (String)
            state.user.name = action.payload;
        },

        /*======================================*/

        setNickname: function (state, action) {
            // action.payload = nickname (String)
            state.user.nickname = action.payload;
        },

        /*======================================*/

        setColor: function (state, action) {
            // action.payload = color (String [HEX])
            state.user.color = action.payload;
        },

        /*======================================*/

        setLoggedIn: function (state, action) {
            // action.payload = logged in status (Boolean)
            state.user.loggedIn = action.payload;
        },

        /*======================================*/
    },
});
export const {
    getUserFetch,
    getUserSuccess,
    getUserFailure,
    setID,
    setName,
    setNickname,
    setColor,
} = userSlice.actions;
export default userSlice.reducer;
