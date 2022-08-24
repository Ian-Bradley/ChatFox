import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: {
        name: '',
        active: false,
        locked: false,
        password: '',
    },
};

// TODO: all channel slices
// TODO: add 's' to channel in this file

let channelsSlice = createSlice({
    name: 'channels',
    initialState: initialState,
    reducers: {
        /*======================================*/

        // FUNCTION: addChannel
        addChannel: function (state, action) {
            // action.payload = channel (object)
            state.channels.push(action.payload);
        },

        /*======================================*/

        // FUNCTION: deleteChannel
        deleteChannel: function (state, action) {
            // action.payload = name (string)
            state.channels.filter((channel) => channel.name !== action.payload);
        },

        /*======================================*/

        // FUNCTION: deleteAllChannels
        deleteAllChannels: function (state, action) {
            state.channels = [];
        },

        /*======================================*/

        // FUNCTION: setChannels
        setChannels: function (state, action) {
            // action.payload = channels (array of channel objects)
            state.channels = action.payload;
        },

        /*======================================*/

        // FUNCTION: setChannelName
        setChannelName: function (state, action) {
            // action.payload = names data (object {oldName: (string), newName: (string)})
            state.channels.map((channel) => {
                if (channel.name === action.payload.oldName) {
                    channel.name = action.payload.newName;
                }
            });
        },

        /*======================================*/

        // FUNCTION: setChannelDescription
        setChannelDescription: function (state, action) {
            // action.payload = names data (object {name: (string), description: (string)})
            state.channels.map((channel) => {
                if (channel.name === action.payload.name) {
                    channel.description = action.payload.description;
                }
            });
        },

        /*======================================*/
        // FUNCTION: setChannelPrivate
        setChannelPrivate: function (state, action) {
            // action.payload = locking data (object {name: (string), password: (string)})
            state.channels.map((channel) => {
                if (channel.name === action.payload.name) {
                    channel.locked = true;
                    channel.password = action.payload.password;
                }
            });
        },

        /*======================================*/

        // FUNCTION: setChannelPublic
        setChannelPublic: function (state, action) {
            // action.payload = name (string)
            state.channels.map((channel) => {
                if (channel.name === action.payload) {
                    channel.locked = false;
                    channel.password = '';
                }
            });
        },

        /*======================================*/

        // FUNCTION: setChannelPassword
        setChannelPassword: function (state, action) {
            // action.payload = lockData (object {name: (string), password: (string)})
            state.channels.map((channel) => {
                if (channel.name === action.payload.name) {
                    channel.password = action.payload.password;
                }
            });
        },

        /*======================================*/
    },
});
export const {
    addChannel,
    deleteChannel,
    deleteAllChannels,
    setChannels,
    setChannelName,
    setChannelDescription,
    setChannelPrivate,
    setChannelPublic,
    setChannelPassword,
} = channelsSlice.actions;
export default channelsSlice.reducer;
