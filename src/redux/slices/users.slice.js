import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

/*
user {object}
    id: {number}
    name: {string}
    nickname: {string}
    color: {string}
    channel: {string}
*/

let usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        addUser: function (state, action) {
            // action.payload = user {object}
            state.users.push(action.payload);
        },
        /*================================================*/
        /*================================================*/
        removeUser: function (state, action) {
            // action.payload = id {number}
            state.users.filter((user) => user.id !== action.payload);
        },

        /*================================================*/
        /*================================================*/
        setUsers: function (state, action) {
            // action.payload = users {array of user objects}
            state.users = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setUserName: function (state, action) {
            // action.payload = {object {id: {number}, name: {string}}}
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.name = action.payload.name;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        setUserNickname: function (state, action) {
            // action.payload = userData {object {id: {number}, nickname: {string}}}
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.nickname = action.payload.nickname;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        setUserColor: function (state, action) {
            // action.payload = userData {object {id: {number}, color: {string}}}
            state.users.map((user) => {
                if (user.id === action.payload.id) {
                    user.color = action.payload.color;
                }
            });
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { addUser, removeUser, setUsers, setUserName, setUserNickname, setUserColor } =
    usersSlice.actions;
export default usersSlice.reducer;
