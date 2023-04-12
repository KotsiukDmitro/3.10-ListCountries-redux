import './App.css';

function CountryDetails(props) {

    const item = props.element

    return props.open && (<>
        <div className={props.open && "backDrop"} onClick={props.openClose}></div>
        <div className={props.open ? 'country-info-details active' : 'country-info-details'}>
            <i className="fa-solid fa-xmark close " onClick={props.openClose}></i>
            <img alt='flag' className='flag' src={item.flags.svg} />
            <h3 className='name-country'>{item.name.common}</h3>
            <h5 className='country-info'>Population: <span className='data'>{item.population.toLocaleString()}</span></h5>
            <h5 className='country-info'>Region: <span className='data'>{item.region}</span></h5>
            <h5 className='country-info'>Capital: <span className='data'>{item.capital}</span></h5>
            <h5 className='country-info'>Continent: <span className='data'>{item.continents[0]}</span></h5>
            <h5 className='country-info'>Timezones: <span className='data'>{item.timezones[0]}</span></h5>
            <h5 className='country-info'>Map: <a href={`${item.maps.googleMaps}`}>{item.maps.googleMaps}</a></h5>

        </div>
    </>
    )

}

export default CountryDetails