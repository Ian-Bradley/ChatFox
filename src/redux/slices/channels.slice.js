import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channel: {
        id: '',
        name: '',
        active: false,
        locked: false,
        password: '',
    },
};

// TODO: all channel slices
// TODO: add 's' to channel in this file

let channelSlice = createSlice({
    name: 'channel',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setChannel: function (state, action) {
            // action.payload = channel (Object)
            state.channel = action.payload;
        },

        /*======================================*/

        setName: function (state, action) {
            // action.payload = name (String)
            state.channel.name = action.payload;
        },

        /*======================================*/

        setPublic: function (state, action) {
            state.channel.locked = false;
            state.channel.password = '';
        },

        /*======================================*/

        setPrivate: function (state, action) {
            // action.payload = password (String)
            state.channel.locked = true;
            state.channel.password = action.payload;
        },

        /*======================================*/

        setPassword: function (state, action) {
            // action.payload = password (String)
            state.channel.password = action.payload;
        },

        /*======================================*/
        /*======================================*/

        addChannel: function (state, action) {
            // action.payload = channel (Object)
            state.channels.push(action.payload);
        },

        /*======================================*/

        deleteChannel: function (state, action) {
            // action.payload = ID (String)
            state.channels.filter((channel) => channel.id !== action.payload);
        },

        /*======================================*/

        deleteAllChannels: function (state, action) {
            state.channels = [];
        },

        /*======================================*/

        setChannels: function (state, action) {
            // action.payload = channels (Array of channel Objects)
            state.channels = action.payload;
        },

        /*======================================*/

        setChannelActive: function (state, action) {
            // action.payload = id (String)
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.locked = true;
                }
            });
        },

        /*======================================*/

        setChannelInactive: function (state, action) {
            // action.payload = id (String)
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.locked = false;
                }
            });
        },

        /*======================================*/

        setChannelPrivate: function (state, action) {
            // action.payload = lockData (Object {id: (String), password: (String)})
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.locked = true;
                    channel.password = action.payload.password;
                }
            });
        },

        /*======================================*/

        setChannelPublic: function (state, action) {
            // action.payload = id (String)
            state.channels.map((channel) => {
                if (channel.id === action.payload) {
                    channel.locked = false;
                    channel.password = '';
                }
            });
        },

        /*======================================*/

        setChannelPassword: function (state, action) {
            // action.payload = lockData (Object {id: (String), password: (String)})
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.password = action.payload.password;
                }
            });
        },

        /*======================================*/
    },
});
export const { setChannel, setName, setPublic, setPrivate, setPassword } = channelSlice.actions;
export default channelSlice.reducer;
