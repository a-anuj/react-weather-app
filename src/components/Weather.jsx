import React, { useState,useRef,useEffect } from 'react'
import './Weather.css'
import search_image from '../assets/search.png'
import clear_image from '../assets/clear.png'
import cloud_image from '../assets/cloud.png'
import drizzle_image from '../assets/drizzle.png'
import humidity_image from '../assets/humidity.png'
import rain_image from '../assets/rain.png'
import snow_image from '../assets/snow.png'
import wind_image from '../assets/wind.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons ={
    "01d" : clear_image,
    "01n" : clear_image,
    "02d" : cloud_image,
    "02n" : cloud_image,
    "03n" : cloud_image,
    "03d" : cloud_image,
    "04d" : drizzle_image,
    "04n" : drizzle_image,
    "09d" : rain_image,
    "09n" : rain_image,
    "10d" : rain_image,
    "10n" : rain_image,
    "13d" : snow_image,
    "13n" : snow_image

  }
  
  const search = async (city) =>{
    if(city === ""){
        alert("Please enter the city!")
        return;
    }
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
            alert(data.message);
            return;
        }

        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_image;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
            
        })
    
    
    } catch (error){
        setWeatherData(false);
        console.error("Error in fetching weather data")
    }
  }
  useEffect(() => {
    search("Coimbatore")
  },[])

    return (
    <div className='weather'>
      <div className="search-bar">
        <input ref = {inputRef} type="text" placeholder='Search' />
        <img src={search_image} alt="Search_icon" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="Cloud" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature} °C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_image} alt="" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_image} alt="" />
            <div>
                <p>{weatherData.windSpeed} Km/hr</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}

      
    </div>
  )
}

export default Weather
