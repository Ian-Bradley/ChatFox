import { createSlice } from '@reduxjs/toolkit';
import { generateRandomName, generateRandomColor } from 'Util/helpers/functions.js';

const initialState = {
    user: {
        name: generateRandomName(true),
        nickname: generateRandomName(false),
        color: generateRandomColor(),
        loggedIn: false,
    },
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setName: function (state, action) {
            // action.payload = name (String)
            state.user.name = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setNickname: function (state, action) {
            // action.payload = nickname (String)
            state.user.nickname = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setColor: function (state, action) {
            // action.payload = color (String [HEX])
            state.user.color = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setLoggedIn: function (state, action) {
            // action.payload = logged in status {boolean}
            state.user.loggedIn = action.payload;
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { setName, setNickname, setColor, setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
