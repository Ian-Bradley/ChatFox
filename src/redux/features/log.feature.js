import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    log: []
}

/*
logItem (Object)
    id: (String)
    data: (Object)
        type (String)
        time (String)
        name (String)
        namePrev (String)
        nickname (String)
        nicknamePrev (String)
        color (String)
        colorPrev (String)
*/

let logSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        /*======================================*/

        addLogItem: function (state, action)
        {
            // action.payload = log (Object)
            state.log.push( action.payload )
        },

        /*======================================*/

        deleteLogItem: function (state, action)
        {
            // action.payload = id (String)
            state.log.filter( logItem => logItem.id !== action.payload )
        },

        /*======================================*/

        deleteAllLogItems: function (state, action)
        {
            state.log = []
        },

        /*======================================*/
    }
})
export const {
    addLogItem,
    deleteLogItem,
    deleteAllLogItems,
} = logSlice.actions
export default logSlice.reducer