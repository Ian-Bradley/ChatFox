import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
};

/*
channel {object}
    id: {number}
    name: {string}
    active: {boolean}
    locked: {boolean}
    password: {string}
    users: {array}
*/

let channelsSlice = createSlice({
    name: 'channels',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        // FUNCTION: addChannel
        addChannel: function (state, action) {
            // action.payload = channel {object}
            state.channels.push(action.payload);
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: deleteChannel
        deleteChannel: function (state, action) {
            // action.payload = id {number}
            state.channels.filter((channel) => channel.id !== action.payload);
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: deleteAllChannels
        deleteAllChannels: function (state) {
            state.channels = [];
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannels
        setChannels: function (state, action) {
            // action.payload = channels {array of channel objects}
            state.channels = action.payload;
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelName
        setChannelName: function (state, action) {
            // action.payload = (object {id: {number}, name: {string}})
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.name = action.payload.name;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelDescription
        setChannelDescription: function (state, action) {
            // action.payload = {object {id: {number}, description: {string}}}
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.description = action.payload.description;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPublic
        setChannelPublic: function (state, action) {
            // action.payload = channel id {number}
            state.channels.map((channel) => {
                if (channel.id === action.payload) {
                    channel.locked = false;
                    channel.password = '';
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPrivate
        setChannelPrivate: function (state, action) {
            // action.payload = {object {id: {number}, password: {string}}}
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.locked = true;
                    channel.password = action.payload.password;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPassword
        setChannelPassword: function (state, action) {
            // action.payload = {object {id: {number}, password: {string}}}
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.password = action.payload.password;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: => addUserToChannel
        addUserToChannel(state, action) {
            // action.payload = {object {id: {number}, userName: {string}}}
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.users.push(action.payload.userName);
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: => removeUserFromChannel
        removeUserFromChannel(state, action) {
            // action.payload = {object {id: {number}, userName: {string}}}
            state.channels.map((channel) => {
                if (channel.id === action.payload.id) {
                    channel.users = channel.users.filter(
                        (user) => user !== action.payload.userName
                    );
                }
            });
        },
        /*================================================*/
        /*================================================*/
    },
});
export const {
    addChannel,
    deleteChannel,
    deleteAllChannels,
    setChannels,
    setChannelName,
    setChannelDescription,
    setChannelPublic,
    setChannelPrivate,
    setChannelPassword,
    addUserToChannel,
    removeUserFromChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
