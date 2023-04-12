import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySlice"
import themeReducer from "./themeSlice"

export default configureStore({
    reducer: {
        countries: countryReducer,
        theme: themeReducer
    },
});