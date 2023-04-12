import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countries: []
    },
    reducers: {
        setCountries(state, actions) {
            state.countries = actions.payload
        }
    }
})
export const getCountries = async (dispatch, country, region) => {
    const urlMain = 'https://restcountries.com/v3.1'
    const url = country ? `${urlMain}/name/${country}` : `${urlMain}/all`
    axios({
        method: 'get',
        url: url
    })
        .then(function (response) {
            const list = changeCountriesList(response, region)
            dispatch(setCountries(list))
            console.log(response);
        })
}
function sortCountry(i, j) {
    if (i.name.common < j.name.common) {
        return -1
    }
    if (i.name.common > j.name.common) {
        return 1
    }
    return 0
}
function changeCountriesList(response, inputRegion) {
    const country = response.data.filter(item => {
        if (inputRegion === '') {
            return true
        }
        if (inputRegion === item.region)
            return true
    })
    return country.sort(sortCountry)
}
export const { setCountries } = countrySlice.actions
export default countrySlice.reducer
