import { createSlice } from '@reduxjs/toolkit';
import { generateRandomName, generateRandomColor } from '../../util/functions.js';

const initialState = {
    user: {
        id: '1',
        name: generateRandomName(true),
        nickname: generateRandomName(false),
        color: generateRandomColor(),
    },
};

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
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
    },
});
export const { setID, setName, setNickname, setColor } = userSlice.actions;
export default userSlice.reducer;
