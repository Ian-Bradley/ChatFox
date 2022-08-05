import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preferences: {
        showTimestamps: false,
        showNameChanges: false,
        showColorChanges: false,
        showUserJoins: false,
        show24HourTime: false,
    }
}

let preferencesSlice = createSlice({
    name: 'preferences',
    initialState: initialState,
    reducers: {
        /*======================================*/

        toggleTimestamps: function (state, action)
        {
            state.preferences.showTimestamps = !state.preferences.showTimestamps
        },

        /*======================================*/

        toggleNameChanges: function (state, action)
        {
            state.preferences.showNameChanges = !state.preferences.showNameChanges
        },

        /*======================================*/

        toggleColorChanges: function (state, action)
        {
            state.preferences.showColorChanges = !state.preferences.showColorChanges
        },

        /*======================================*/
        
        toggleUserJoins: function (state, action)
        {
            state.preferences.showUserJoins = !state.preferences.showUserJoins
        },

        /*======================================*/
        
        toggle24HourTime: function (state, action)
        {
            state.preferences.show24HourTime = !state.preferences.show24HourTime
        },

        /*======================================*/
    }
});
export const {
    toggleTimestamps,
    toggleNameChanges,
    toggleColorChanges,
    toggleUserJoins,
    toggle24HourTime
} = preferencesSlice.actions;
export default preferencesSlice.reducer;