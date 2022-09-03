import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modals: {
        preferences: false,
        addChannel: false,
        editChannel: false,
        editUser: false,
    },
};
let modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        /*================================================*/
        /*================================================*/
        setModalActive: function (state, action) {
            // action.payload = modal {string}
            if (state.modals[action.payload] !== undefined) {
                state.modals[action.payload] = true;
            }
        },
        /*================================================*/
        /*================================================*/
        setModalInactive: function (state, action) {
            // action.payload = modal {string}
            if (state.modals[action.payload] !== undefined) {
                state.modals[action.payload] = false;
            }
        },
        /*================================================*/
        /*================================================*/
    },
});
export const { setModalActive, setModalInactive } = modalsSlice.actions;
export default modalsSlice.reducer;
