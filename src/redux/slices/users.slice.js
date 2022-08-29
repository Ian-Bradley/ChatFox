import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

/*
user (Object)
    name: (String)
    nickname: (String)
    color: (String [HEX])
*/

let usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        addUser: function (state, action) {
            // action.payload = user (object)
            state.users.push(action.payload);
        },
        /*================================================*/
        /*================================================*/
        removeUser: function (state, action) {
            // action.payload = name (string)
            state.users.filter((user) => user.name !== action.payload);
        },

        /*================================================*/
        /*================================================*/
        setUsers: function (state, action) {
            // action.payload = users (array of user objects)
            state.users = action.payload;
        },
        /*================================================*/
        /*================================================*/
        setUserName: function (state, action) {
            // action.payload = userData (object {name: (string), newName: (string)})
            state.users.map((user) => {
                if (user.name === action.payload.name) {
                    user.name = action.payload.newName;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        setUserNickname: function (state, action) {
            // action.payload = userData (object {name: (string), nickname: (string)})
            state.users.map((user) => {
                if (user.name === action.payload.name) {
                    user.nickname = action.payload.nickname;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        setUserColor: function (state, action) {
            // action.payload = userData (object {name: (string), color: (string [HEX])})
            state.users.map((user) => {
                if (user.name === action.payload.name) {
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
