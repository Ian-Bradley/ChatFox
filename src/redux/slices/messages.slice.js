import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    isLoading: false,
};

/*
message (Object)
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
    content: (String)
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
            // action.payload = messages (Array of message Objects)
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
            // action.payload = messages (Array of message Objects)
            state.messages = action.payload;
        },
        /*================================================*/
        /*================================================*/

        addMessage: function (state, action) {
            // action.payload = message (Object)
            state.messages.push(action.payload);
        },
        /*================================================*/
        /*================================================*/

        deleteMessage: function (state, action) {
            // action.payload = id (String)
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
