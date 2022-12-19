import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weather, setWeather ] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log("Effect")
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
            .then(response => {
                axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}&units=metric`)
                    .then(response2 => {
                        setWeather(response2.data)
                    })
            })
    }, [])

    return ( 
    <div>
        {weather.base ? 
            <>
                <h3>Weather in {capital}</h3>
                <div>Temperature {weather.main.temp} Celcius</div>
                <img alt="icon"
                    src={`http://openweathermap.org/img/wn/${ weather.weather[0].icon}@2x.png`}/>
                <div>Wind {weather.wind.speed}</div>
            </>:
            <span>Loading...</span>}
    </div>
    )
}

export default Weather