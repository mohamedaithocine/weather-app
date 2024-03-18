import "./css/Home.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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
      <div>
        <h1>Your Location</h1>
      </div>
      <div>
        <h3>Follow home page figma layout</h3>
      </div>
    </div>
  );
}

export default Home;
