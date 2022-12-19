import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState("")
  const [ showIndex, setShowIndex ] = useState([false, 0])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleShow = (i) => {
    i === showIndex[1] && showIndex[0] === true ? 
      setShowIndex([false, i]) :
      setShowIndex([true, i])
    
  }


  const filteredSearch = 
    countries.filter(country => country.name.common.toLowerCase().includes(search))

  
  return (
    <>
      <input value={search} onChange={handleSearch} />
      {filteredSearch.length > 10 ? 
        <div>Please be more specific</div>: 
        filteredSearch.length === 1 ? 
          <div>
            <h1>{filteredSearch[0].name.common}</h1>
            <p>Capital: {filteredSearch[0].capital}</p>
            <p>Area: {filteredSearch[0].area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.keys(filteredSearch[0].languages).map(key => 
                <li key={filteredSearch[0].languages[key]}>
                  {filteredSearch[0].languages[key]}
                </li>
                )}
            </ul>
            <h3>Flag</h3>
            <img src={filteredSearch[0].flags.png} alt="Flag"></img>
            <Weather capital={filteredSearch[0].capital} />
          </div>:
            <ul>
              {filteredSearch.map((country, i) => 
                <li key={country.name.common}>
                  {country.name.common} 
                  <button onClick={() => handleShow(i)}>Show</button>
                  {showIndex[0] ? 
                    showIndex[1] === i ? 
                      <div>
                        <h1>{filteredSearch[i].name.common}</h1>
                        <p>Capital: {filteredSearch[i].capital}</p>
                        <p>Area: {filteredSearch[i].area}</p>
                        <h3>Languages</h3>
                        <ul>
                          {Object.keys(filteredSearch[i].languages).map(key => 
                            <li key={filteredSearch[i].languages[key]}>
                              {filteredSearch[i].languages[key]}
                            </li>
                            )}
                        </ul>
                        <h3>Flag</h3>
                        <img src={filteredSearch[i].flags.png} alt="Flag"></img>
                        <Weather capital={filteredSearch[i].capital} />
                      </div> : <></> : <></>}
                  
                </li>)}
            </ul>}
    </>
  );
}

export default App;
