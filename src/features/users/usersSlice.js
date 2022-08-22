import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = [
    { id: '0', name: 'Dude Lebowski' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Dave Gray' }
]


const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {}
})


export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;