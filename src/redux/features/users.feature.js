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

        setUserNickname: function (state, action)
        {
            // action.payload = userData (Object {id: (String), name: (String)})
            state.users.map( ( user ) =>
                {
                    if ( user.id === action.payload.id )
                    {
                        user.nickname = action.payload.name
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
    setUserNickname,
    setUserColor,
} = usersSlice.actions
export default usersSlice.reducer