import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        themes: 'light'
    },
    reducers: {
        toggle(state, action) {
            state.themes = state.themes === 'light' ? 'dark' : 'light'
        }
    }
})
export const { toggle } = themeSlice.actions
export default themeSlice.reducer
