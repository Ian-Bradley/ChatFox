import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: []
}

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
        /*======================================*/

        addMessage: function (state, action)
        {
            // action.payload = message (Object)
            state.messages.push( action.payload )
        },

        /*======================================*/

        deleteMessage: function (state, action)
        {
            // action.payload = id (String)
            state.messages.filter( message => message.id !== action.payload )
        },

        /*======================================*/

        deleteAllMessages: function (state, action)
        {
            state.messages = []
        },

        /*======================================*/

        setMessages: function (state, action)
        {
            // action.payload = messages (Array of message Objects)
            state.messages = action.payload
        },

        /*======================================*/
    }
})
export const {
    addMessage,
    deleteMessage,
    deleteAllMessages,
    setMessages,
} = messagesSlice.actions
export default messagesSlice.reducer