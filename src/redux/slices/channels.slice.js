import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
};

/*
user {object}
    name: {string}
    active: {boolean}
    locked: {boolean}
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
            // action.payload = name {string}
            state.channels.filter((channel) => channel.name !== action.payload);
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
            // action.payload = channels (array of channel objects)
            state.channels = action.payload;
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelName
        setChannelName: function (state, action) {
            // action.payload = (object {channelName: {string}, newName: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
                    channel.name = action.payload.newName;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelDescription
        setChannelDescription: function (state, action) {
            // action.payload = (object {channelName: {string}, description: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
                    channel.description = action.payload.description;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPublic
        setChannelPublic: function (state, action) {
            // action.payload = channel name {string}
            state.channels.map((channel) => {
                if (channel.name === action.payload) {
                    channel.locked = false;
                    channel.password = '';
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPrivate
        setChannelPrivate: function (state, action) {
            // action.payload = (object {channelName: {string}, password: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
                    channel.locked = true;
                    channel.password = action.payload.password;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: setChannelPassword
        setChannelPassword: function (state, action) {
            // action.payload = (object {channelName: {string}, password: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
                    channel.password = action.payload.password;
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: => addUserToChannel
        addUserToChannel(state, action) {
            // action.payload = (object {channelName: {string}, userName: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
                    channel.users.push(action.payload.userName);
                }
            });
        },
        /*================================================*/
        /*================================================*/
        // FUNCTION: => removeUserFromChannel
        removeUserFromChannel(state, action) {
            // action.payload = (object {channelName: {string}, userName: {string}})
            state.channels.map((channel) => {
                if (channel.name === action.payload.channelName) {
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
