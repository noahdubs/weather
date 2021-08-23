import React, {useState, useEffect} from 'react'

import MainWeather from '../main-weather/main-weather.component'
import SidePanel from '../side-panel/side-panel.component'
import HourlyWeather from '../hourly-weather/hourly-weather.component'

import './weather-collection.styles.css'

const WeatherCollection = props => {
    const [weather, setWeather] = useState()

    const apiKey = 'b504e77f4158753c73047b49554c803f'
    const units = 'imperial'

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toString()
            const long = position.coords.longitude.toString()

            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${units}&exclude=minutely&appid=${apiKey}`
            const locationUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`

            Promise.all([
                fetch(weatherUrl).then(res => res.json()),
                fetch(locationUrl).then(res => res.json())
            ]).then(([weatherData, locationData]) => {
                const locationObject = locationData[0]
                weatherData.location = {
                    name: locationObject.name,
                    country: locationObject.country,
                    state: locationObject.state 
                }
                setWeather(weatherData)
            })
        })
    }, [])
    console.log(weather)
    if(weather) {
        return (
            <div className="weather-collection">
                <div className="row weather-row">
                    <MainWeather 
                        location={weather.location}
                        current={weather.current}
                    />
                    <SidePanel 
                        current={weather.current}
                    />
                </div>
                <div className="row">
                    <HourlyWeather />
                    <SidePanel
                        current={weather.current}
                    />
                    {
                    // 'hourly forcast, sidePanel'}
                    }
                </div>
                <div className="row"> 
                    {
                    //'daily forecase, side panel'
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }
    
}

export default WeatherCollection