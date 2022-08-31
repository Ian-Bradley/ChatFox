import { createSlice } from '@reduxjs/toolkit';
import { generateRandomName, generateRandomColor } from 'Util/helpers/functions.js';

const initialState = {
    user: {
        name: generateRandomName(true),
        nickname: generateRandomName(false),
        color: generateRandomColor(),
        loggedIn: false,
        channel: '',
    },
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setName: function (state, action) {
            // action.payload = name {string}
            state.user.name = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setNickname: function (state, action) {
            // action.payload = nickname {string}
            state.user.nickname = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setColor: function (state, action) {
            // action.payload = color {string, hex}
            state.user.color = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setLoggedIn: function (state) {
            state.user.channel = 1;
            state.user.loggedIn = true;
            if (!state.user.color) {
                state.user.color = generateRandomColor();
            }
        },
        /*================================================*/
        /*================================================*/
        setLoggedOut: function (state) {
            state.user.name = '';
            state.user.nickname = '';
            state.user.color = '';
            state.user.loggedIn = false;
            state.user.channel = '';
        },
        /*================================================*/
        /*================================================*/
        setChannel: function (state, action) {
            // action.payload = channel name {string}
            state.user.channel = action.payload;
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { setName, setNickname, setColor, setLoggedIn, setLoggedOut, setChannel } =
    userSlice.actions;
export default userSlice.reducer;
