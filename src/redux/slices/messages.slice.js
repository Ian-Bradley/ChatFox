import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    isLoading: false,
};

/*
message {object}
    id: {number}
    channelID: {number}
    timestamp: {string}
    name: {string}
    nickname: {string}
    color: {string}
    content: {string}
*/

let messagesSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        getMessages: function (state) {
            state.isLoading = true;
        },
        /*================================================*/
        /*================================================*/
        getMessagesSuccess: function (state, action) {
            // action.payload = messages {array of message Oobjects}
            state.messages = action.payload;
            state.isLoading = false;
        },
        /*================================================*/
        /*================================================*/
        getMessagesFailure: function (state) {
            state.isLoading = false;
        },
        /*================================================*/
        /*================================================*/

        setMessages: function (state, action) {
            // action.payload = messages {array of message objects}
            state.messages = action.payload;
        },
        /*================================================*/
        /*================================================*/

        addMessage: function (state, action) {
            // action.payload = message {object}
            state.messages.push(action.payload);
        },
        /*================================================*/
        /*================================================*/

        deleteMessage: function (state, action) {
            // action.payload = id {number}
            state.messages.filter((message) => message.id !== action.payload);
        },
        /*================================================*/
        /*================================================*/

        deleteAllMessages: function (state) {
            state.messages = [];
        },
        /*================================================*/
        /*================================================*/
    },
});
export const {
    getMessages,
    getMessagesSuccess,
    getMessagesFailure,
    setMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
} = messagesSlice.actions;
export default messagesSlice.reducer;
