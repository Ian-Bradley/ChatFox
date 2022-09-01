import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    log: [],
};

/*
logItem {object}
    id: {string}
    data: {object}
        type {string}
        time {string}
        name {string}
        namePrev {string}
        nickname {string}
        nicknamePrev {string}
        color {string}
        colorPrev {string}
*/

let logSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        addLogItem: function (state, action) {
            // action.payload = log {object}
            state.log.push(action.payload);
        },

        /*================================================*/
        /*================================================*/
        deleteLogItem: function (state, action) {
            // action.payload = id {string}
            state.log.filter((logItem) => logItem.id !== action.payload);
        },
        /*================================================*/
        /*================================================*/
        deleteAllLogItems: function (state) {
            state.log = [];
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { addLogItem, deleteLogItem, deleteAllLogItems } = logSlice.actions;
export default logSlice.reducer;
