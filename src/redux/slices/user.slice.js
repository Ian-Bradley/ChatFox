import { createSlice } from '@reduxjs/toolkit';
import { generateRandomColor } from 'Util/helpers/functions.js';

const initialState = {
    user: {
        id: 0,
        name: '',
        nickname: '',
        color: '',
        role: '',
        channelID: 0,
    },
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setID: function (state, action) {
            // action.payload = id {number}
            state.user.id = action.payload;
        },
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
            // action.payload = color {string}
            state.user.color = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setRole: function (state, action) {
            // action.payload = role {string}
            state.user.role = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setChannelID: function (state, action) {
            // action.payload = channel id {number}
            state.user.channelID = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setUserData: function (state, action) {
            // TODO: action.payload = 
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                nickname: action.payload.nickname ? action.payload.nickname : '',
                color: action.payload.color ? action.payload.color : generateRandomColor(),
                role: '',
                channelID: 1,
            };
        },
        /*================================================*/
        /*================================================*/
        clearUserData: function (state) {
            // TODO: action.payload = 
            state.user = {
                id: 0,
                name: '',
                nickname: '',
                color: '',
                role: '',
                channelID: 0,
            };
        },
        /*================================================*/
        /*================================================*/
    },
});
export const {
    setID,
    setName,
    setNickname,
    setColor,
    setRole,
    setChannelID,
    setUserData,
    clearUserData,
} = userSlice.actions;
export default userSlice.reducer;
