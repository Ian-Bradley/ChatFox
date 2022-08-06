import { createSlice } from '@reduxjs/toolkit'
import * as H from '../../helpers/helpers.js'

const initialState = {
    channel: {
        id: '',
        name: '',
        active: false,
        locked: false,
        password: '',
    }
}

let channelSlice = createSlice({
    name: 'channel',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setChannel: function (state, action)
        {
            // action.payload = channel (Object)
            state.channel = action.payload
        },

        /*======================================*/

        setName: function (state, action)
        {
            // action.payload = name (String)
            state.channel.name = action.payload
        },

        /*======================================*/

        setPublic: function (state, action)
        {
            state.channel.locked   = false
            state.channel.password = ''
        },

        /*======================================*/

        setPrivate: function (state, action)
        {
            // action.payload = password (String)
            state.channel.locked   = true
            state.channel.password = action.payload
        },

        /*======================================*/

        setPassword: function (state, action)
        {
            // action.payload = password (String)
            state.channel.password = action.payload
        },

        /*======================================*/
    }
})
export const {
    setChannel,
    setName,
    setPublic,
    setPrivate,
    setPassword,
} = channelSlice.actions
export default channelSlice.reducer