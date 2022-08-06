import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

/*
user (Object)
    id: (Number)
    name: (String)
    nickname: (String)
    color: (String [HEX])
*/

let usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        /*======================================*/

        addUser: function (state, action)
        {
            // action.payload = user (Object)
            state.users.push( action.payload )
        },

        /*======================================*/

        removeUser: function (state, action)
        {
            // action.payload = ID (Number)
            state.users.filter( user => user.id !== action.payload )
        },

        /*======================================*/

        setUsers: function (state, action)
        {
            // action.payload = users (Array of user Objects)
            state.users = action.payload
        },

        /*======================================*/

        setUserName: function (state, action)
        {
            // action.payload = userData (Object {id: (String), name: (String)})
            state.users.map( ( user ) =>
                {
                    if ( user.id === action.payload.id )
                    {
                        user.name = action.payload.name
                    }
                }
            )
        },

        /*======================================*/

        setUserNickname: function (state, action)
        {
            // action.payload = userData (Object {id: (String), nickname: (String)})
            state.users.map( ( user ) =>
                {
                    if ( user.id === action.payload.id )
                    {
                        user.nickname = action.payload.nickname
                    }
                }
            )
        },

        /*======================================*/

        setUserColor: function (state, action)
        {
            // action.payload = userData (Object {id: (String), color: (String [HEX])})
            state.users.map( ( user ) =>
                {
                    if ( user.id === action.payload.id )
                    {
                        user.color = action.payload.color
                    }
                }
            )
        },

        /*======================================*/
    }
})
export const {
    addUser,
    deleteUser,
    setUsers,
    setUserName,
    setUserNickname,
    setUserColor,
} = usersSlice.actions
export default usersSlice.reducer