import "../css/SavedLocations.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function SavedLocations() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [savedWeatherData, setSavedWeatherData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b167c88bb7301bc04a99e1bd24f7c97c`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [city]);

  useEffect(() => {
    // Fetch saved data from localStorage on initial render
    const savedData = JSON.parse(localStorage.getItem("savedWeatherData"));
    if (savedData) {
      setSavedWeatherData(savedData);
    }
  }, []); // Empty dependency array to ensure it only runs once on initial render

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleSave = (e) => {
    const isAlreadySaved = savedWeatherData.some(
      (savedData) => savedData.id === weatherData.id
    );
    if (!isAlreadySaved && weatherData) {
      const savedWeatherData =
        JSON.parse(localStorage.getItem("savedWeatherData")) || [];
      savedWeatherData.push(weatherData);
      localStorage.setItem(
        "savedWeatherData",
        JSON.stringify(savedWeatherData)
      );
      setSavedWeatherData(savedWeatherData);
      console.log("Weather data saved:", weatherData);
    }
  };

  const handleUnsave = (index) => {
    const updatedSavedData = savedWeatherData.filter((_, i) => i !== index);
    localStorage.setItem("savedWeatherData", JSON.stringify(updatedSavedData));
    setSavedWeatherData(updatedSavedData);
  };

  return (
    <div>
      <h1>Saved Locations</h1>
      <form onSubmit={handleSubmit}>
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search for Location"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit"></button>
        </div>
      </form>
      <div className="Rectangle4">
        {weatherData && (
          <>
            <div className="location">
              <div className="saveB">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              </div>
              <h2>{weatherData.name}</h2>
              <p className="weather-description">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="weather-details">
              <div className="temp">
                <p>{Math.round(weatherData.main.temp)}°C</p>
              </div>
              <p>Humidity : {weatherData.main.humidity}%</p>
              <p>Wind Speed : {weatherData.wind.speed}m/s</p>
            </div>
          </>
        )}
      </div>

      <div className="saved-weather">
        {savedWeatherData.map((data, index) => (
          <div key={index} className="Rectangle4">
            <div className="location">
              <div className="unsaveB">
                <button
                  className="unsave-button"
                  onClick={() => handleUnsave(index)}
                >
                  Unsave
                </button>
              </div>
              <h2>{data.name}</h2>
              <p className="weather-description">
                {data.weather[0].description}
              </p>
            </div>
            <div className="weather-details">
              <div className="temp">
                <p>{Math.round(data.main.temp)}°C</p>
              </div>
              <p>Humidity : {data.main.humidity}%</p>
              <p>Wind Speed : {data.wind.speed}m/s</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SavedLocations;
