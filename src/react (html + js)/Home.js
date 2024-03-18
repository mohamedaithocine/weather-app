import React, { useEffect, useState, useCallback } from 'react';
import '../css/Home.css';
import axios from 'axios';

import clear_icon from "../assets/images/Sunny.svg"
import cloud_icon from "../assets/images/Cloudy.svg"
import drizzle_icon from "../assets/images/Drizzle.svg"
import rain_icon from "../assets/images/Rain.svg"
import snow_icon from "../assets/images/Snow.svg"
import wind_icon from "../assets/images/Wind.svg"
import humidity_icon from "../assets/images/Humidity.svg"

export default function Main() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b167c88bb7301bc04a99e1bd24f7c97c`);
      setWeatherData(response.data);
      console.log(response.data); // You can see all the weather data in console log
      console.log(response.data.weather[0].icon); // You can see all the weather data in console log
      const hourlyResponse = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=b167c88bb7301bc04a99e1bd24f7c97c`
      );
      console.log(hourlyResponse.data); // You can see all the weather data in console log

      if (response.data.weather[0].icon == "01d" || response.data.weather[0].icon == "01n") {setWicon(clear_icon)}
      else if (response.data.weather[0].icon == "02d" || response.data.weather[0].icon == "02n") {setWicon(cloud_icon)}
      else if (response.data.weather[0].icon == "03d" || response.data.weather[0].icon == "03n") {setWicon(drizzle_icon)}
      else if (response.data.weather[0].icon == "04d" || response.data.weather[0].icon == "04n") {setWicon(drizzle_icon)}
      else if (response.data.weather[0].icon == "09d" || response.data.weather[0].icon == "09n") {setWicon(rain_icon)}
      else if (response.data.weather[0].icon == "10d" || response.data.weather[0].icon == "10n") {setWicon(rain_icon)}
      else if (response.data.weather[0].icon == "13d" || response.data.weather[0].icon == "13n") {setWicon(snow_icon)}
      else {setWicon(cloud_icon)}
    } catch (error) {
      console.error(error);
    }
  }, [city]);

    useEffect(() => {
    fetchData();
    }, [fetchData]);
    const handleInputChange = (e) => {
    setCity(e.target.value);
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    };

    
  
  return (
    <div>
    {weatherData ? (

    <>
    <div className='main-container'>
      <form onSubmit={handleSubmit} />
        <div className='currentWeather'>
            <input type='text'
            className='mile-end' 
            placeholder='Tap to enter City Name'     
            value={city}
            onChange={handleInputChange}/>
            {/* You might wanna change h1 back to just your location */}
            <h1 className='your-location'>{weatherData.name}</h1>
            <h3 className='minus-7-f'>{Math.floor(weatherData.main.temp)}°</h3>
            <h3 className='snow-10'>{weatherData.weather[0].description}</h3>
            <div className='highlow'>
              <span className='high-intensity'>H: {weatherData.main.temp_max}°</span>
              <span className='temperature-info'> L: {weatherData.main.temp_min}°</span>
            </div>
        </div>
      
          <div className='rectangle'>
            <div className='weather-hour'>
              <span className='time'>9AM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>
            
            <div className='weather-hour'>
            <span className='time'>10AM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>
            
            <div className='weather-hour'>
            <span className='time'>11AM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>

            <div className='weather-hour'>
            <span className='time'>12PM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>

            <div className='weather-hour'>
            <span className='time'>1PM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>

            <div className='weather-hour'>
            <span className='time'>2PM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>

            <div className='weather-hour'>
            <span className='time'>3PM</span>
              <div className='weather-icon'>
                <img src={wicon} />
              </div>
              <span className='temp-hour'>-7°</span>
            </div>

          </div>

        <div className='tipsBox'>
          <p className='warm-up-tips'>
              Extend the warm-up session to reduce the risk of muscle injuries.
              <br />
              Ensure players are provided with thermal underlayers, gloves, hats
              and shoes designer for the extreme cold
              <br />
              Adopt a more possession-based approach to ensure players are
              constantly moving
        </p>
      </div>
      <div className='precwindDiv'>
        <div className='precipitationBox'>
          <span className='precipitation-info'>precipitation</span>
          <span className='precipitation-info-14'>
            13 mm in the last 24 hours
          </span>
          <span className='precipitation-info-15'>
            next expected is 8mm rain on Wed.
          </span>
        </div>
        <div className='windBox'>
          <span className='wind-info'>wind</span>
          <div className='flex-column-ef'>
            <span className='mph-wind'>{weatherData.wind.speed}m/s</span>
            <span className='mph-gusts'>{weatherData.wind.gust} mph gusts</span>
          </div>
        <img src='../assets/images/Compass.svg'/>
        </div>
      </div>
    </div>


    </>
    ) : (
      <div className='main-container'>
      <form onSubmit={handleSubmit} />
        <div className='currentWeather'>
            <input type='text'
            className='mile-end' 
            placeholder='Tap to enter City Name'     
            value={city}
            onChange={handleInputChange}/>

            <h1 className='your-location'>{}</h1>
            <h3 className='minus-7-f'>-7°</h3>
            <h3 className='snow-10'>Snow</h3>
            <div className='highlow'>
              <span className='high-intensity'>H: 15</span>
              <span className='temperature-info'>° L: 9°</span>
            </div>
        </div>
      
          <div className='rectangle'>
            <div className='weather-hour'>
              <span className='now'>Now</span>
              <span className='time-10am'>10AM</span>
              <span className='time-11am'>11AM</span>
              <span className='time-12pm'>12PM</span>
              <span className='time-1pm'>1PM</span>
              <span className='time-2pm'>2PM</span>
              <span className='time-3pm'>3PM</span>
            </div>
            <div className='flex-row-ac'>
              <div className='snow'>
                <div className='outline' />
              </div>
              <div className='snow-1'>
                <div className='outline-2' />
              </div>
              <div className='snow-3'>
                <div className='outline-4' />
              </div>
              <div className='snow-5'>
                <div className='outline-6' />
              </div>
              <div className='snow-7'>
                <div className='outline-8' />
              </div>
              <div className='snow-9'>
                <div className='outline-a' />
              </div>
              <div className='snow-b'>
                <div className='outline-c' />
              </div>
            </div>
            <div className='flex-row-de'>
              <span className='minus-7'>-7°</span>
              <span className='minus-8'>-8°</span>
              <div className='regroup'>
                <span className='minus-7-d'>-7°</span>
                <span className='minus-6'>-6°</span>
                <span className='minus-6-e'>-6°</span>
              </div>
              <span className='minus-10'>-10°</span>
              <span className='minus-9'>-9°</span>
            </div>
          </div>

        <div className='tipsBox'>
          <p className='warm-up-tips'>
              Extend the warm-up session to reduce the risk of muscle injuries.
              <br />
              Ensure players are provided with thermal underlayers, gloves, hats
              and shoes designer for the extreme cold
              <br />
              Adopt a more possession-based approach to ensure players are
              constantly moving
        </p>
      </div>
      <div className='precwindDiv'>
        <div className='precipitationBox'>
          <span className='precipitation-info'>precipitation</span>
          <span className='precipitation-info-14'>
            13 mm in the last 24 hours
          </span>
          <span className='precipitation-info-15'>
            next expected is 8mm rain on Wed.
          </span>
        </div>
        <div className='windBox'>
          <span className='wind-info'>wind</span>
          <div className='flex-column-ef'>
            <span className='mph-wind'>5mph wind</span>
            <span className='mph-gusts'>15 mph gusts</span>
          </div>
        </div>
      </div>
    </div>
  )}
  </div>
  );

  
}
