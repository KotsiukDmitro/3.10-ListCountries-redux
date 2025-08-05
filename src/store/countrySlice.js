import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countries: []
    },
    reducers: {
        setCountries(state, actions) {
            state.countries = actions.payload;
        }
    }
});

export const getCountries = async (dispatch, country, region) => {
    const urlMain = 'https://restcountries.com/v3.1';
    const isValidCountry = country && country.trim() !== '';
    const fields = 'name,region,flags,population,capital,cca3';
    const url = isValidCountry
        ? `${urlMain}/name/${encodeURIComponent(country.trim())}?fields=${fields}`
        : `${urlMain}/all?fields=${fields}`;

    try {
        const response = await axios.get(url);
        const list = changeCountriesList(response, region);
        dispatch(setCountries(list));
        console.log(response);
    } catch (error) {
        console.error('Ошибка при получении стран:', error.response?.data || error.message);
        dispatch(setCountries([])); // Очистка списка при ошибке
    }
};

function sortCountry(i, j) {
    if (i.name.common < j.name.common) return -1;
    if (i.name.common > j.name.common) return 1;
    return 0;
}

function changeCountriesList(response, inputRegion) {
    const country = response.data.filter(item => {
        if (inputRegion === '') return true;
        return inputRegion === item.region;
    });
    return country.sort(sortCountry);
}

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
