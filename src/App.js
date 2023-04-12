import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from './store/themeSlice';
import { getCountries } from './store/countrySlice';
import CountryDetails from './CountryDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [country, setCountry] = useState('')
  function searchCountry(event) {
    setCountry(event.target.value)
  }
  const [inputRegion, setInputRegion] = useState('')
  function handleChangeRegion(event) {
    setInputRegion(event.target.value)
  }

  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.themes)
  function changeTheme() {
    dispatch(toggle())
  }

  const listCountries = useSelector(state => state.countries.countries)

  const [openCountryDetails, setOpenCountryDelails] = useState()
  function openClose() {
    setOpenCountryDelails((prevState => !prevState))
  }

  const [selectedItem, setSelectedItem] = useState()
  function handleItem(item) {
    setSelectedItem(item)
    openClose()
  }

  useEffect(() => {
    getCountries(dispatch, country, inputRegion)
  }, [dispatch, country, inputRegion])

  return (<>
    <CountryDetails open={openCountryDetails} openClose={openClose} element={selectedItem} />

    <div className={theme}>
      <div className='container'>
        <div className='header'>
          <h3 className='header-text'>Where in the world?</h3>
          <div>
            <FontAwesomeIcon icon={faLightbulb} />
            {/* <i class="fa-solid fa-lightbulb-on"></i> */}
            <button className='btn-theme' onClick={changeTheme}>Light/Dark</button>
          </div>
        </div>
        <div className='row-search'>
          <input className='input-search-country' type='text' placeholder='Search of a country' value={country} onChange={searchCountry}></input>
          <select className='select-region' value={inputRegion} onChange={handleChangeRegion}>
            <option value=''>All regions</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>
        </div>
        <div className='selected-countries'>
          {listCountries.map(item => {
            return (
              <div className='card' key={item.cca3} onClick={() => handleItem(item)}>
                <img alt='flag' className='flag' src={item.flags.svg} />
                <div>
                  <h3 className='name-country'>{item.name.common}</h3>
                  <h5 className='country-info'>Population: <span className='data'>{item.population.toLocaleString()}</span></h5>
                  <h5 className='country-info'>Region: <span className='data'>{item.region}</span></h5>
                  <h5 className='country-info'>Capital: <span className='data'>{item.capital}</span></h5>
                </div>
              </div>
            )

          })}
        </div>
      </div>
    </div>

  </>

  );

}
export default App;
