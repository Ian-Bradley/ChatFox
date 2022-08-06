import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    channels: []
}

/*
channel (Object)
    id: (String)
    name: (String)
    active: (Boolean)
    locked: (Boolean)
    password: (String)
*/

let channelsSlice = createSlice({
    name: 'channels',
    initialState: initialState,
    reducers: {
        /*======================================*/

        addChannel: function (state, action)
        {
            // action.payload = channel (Object)
            state.channels.push( action.payload )
        },

        /*======================================*/

        deleteChannel: function (state, action)
        {
            // action.payload = ID (String)
            state.channels.filter( channel => channel.id !== action.payload )
        },

        /*======================================*/

        deleteAllChannels: function (state, action)
        {
            state.channels = []
        },

        /*======================================*/

        setChannels: function (state, action)
        {
            // action.payload = channels (Array of channel Objects)
            state.channels = action.payload
        },

        /*======================================*/

        setChannelActive: function (state, action)
        {
            // action.payload = id (String)
            state.channels.map( ( channel ) =>
                {
                    if ( channel.id === action.payload.id )
                    {
                        channel.locked = true
                    }
                }
            )
        },

        /*======================================*/

        setChannelInactive: function (state, action)
        {
            // action.payload = id (String)
            state.channels.map( ( channel ) =>
                {
                    if ( channel.id === action.payload.id )
                    {
                        channel.locked = false
                    }
                }
            )
        },

        /*======================================*/

        setChannelPrivate: function (state, action)
        {
            // action.payload = lockData (Object {id: (String), password: (String)})
            state.channels.map( ( channel ) =>
                {
                    if ( channel.id === action.payload.id )
                    {
                        channel.locked   = true
                        channel.password = action.payload.password
                    }
                }
            )
        },

        /*======================================*/

        setChannelPublic: function (state, action)
        {
            // action.payload = id (String)
            state.channels.map( ( channel ) =>
                {
                    if ( channel.id === action.payload )
                    {
                        channel.locked   = false
                        channel.password = ''
                    }
                }
            )
        },

        /*======================================*/
    }
})
export const {
    addChannel,
    deleteChannel,
    deleteAllChannels,
    setChannels,
    setChannelActive,
    setChannelInctive,
    setChannelPrivate,
    setChannelPublic,
} = channelsSlice.actions
export default channelsSlice.reducer