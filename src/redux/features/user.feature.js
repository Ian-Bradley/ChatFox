import { createSlice } from '@reduxjs/toolkit'
import * as H from '../../helpers/helpers.js'

const initialState = {
    user: {
        id: '1',
        name: H.elper.generateRandomName(),
        color: H.elper.generateRandomColor(),
    }
}

let userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /*======================================*/

        setID: function (state, action)
        {
            state.user.id = action.payload
        },

        /*======================================*/

        setName: function (state, action)
        {
            state.user.name = action.payload
        },

        /*======================================*/

        setColor: function (state, action)
        {
            state.user.color = action.payload
        },

        /*======================================*/
    }
})
export const { setID, setName, setColor } = userSlice.actions
export default userSlice.reducer