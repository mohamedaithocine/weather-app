import React, { useEffect, useState, useCallback } from "react";
import "../css/Home.css";
import axios from "axios";

import clear_icon from "../assets/images/Sunny.svg";
import cloud_icon from "../assets/images/Cloudy.svg";
import drizzle_icon from "../assets/images/Drizzle.svg";
import rain_icon from "../assets/images/Rain.svg";
import snow_icon from "../assets/images/Snow.svg";
import wind_icon from "../assets/images/Compass.svg";

// Background images - not in use.
import cloudBG from "../assets/images/cloudBG.jpg";
import drizzleBG from "../assets/images/drizzleBG.jpg";
import rainBG from "../assets/images/rainBG.jpg";
import snowBG from "../assets/images/snowBG.jpg";

export default function Main() {
  const [city, setCity] = useState("Mile End");
  const [weatherData, setWeatherData] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const [bgicon, setBGicon] = useState(null);
  const [advice, setAdvice] = useState(
    `Extend the warm-up session to reduce the risk of muscle injuries. \nEnsure players are provided with thermal underlayers, gloves, hats and shoes designer for the extreme cold \nAdopt a more possession-based approach to ensure players are constantly moving`
  );
  const [windDegree, setWindDegree] = useState(0);
  const bgCSS = { backgroundImage: "url(" + bgicon + ")" };
  const windCSS = { rotate: windDegree + "deg" };

  // If it works it works ¯\_(ツ)_/¯
  const [time9AM, set9AM] = useState(0);
  const [time10AM, set10AM] = useState(0);
  const [time11AM, set11AM] = useState(0);
  const [time12PM, set12PM] = useState(0);
  const [time1PM, set1PM] = useState(0);
  const [time2PM, set2PM] = useState(0);
  const [time3PM, set3PM] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b167c88bb7301bc04a99e1bd24f7c97c`
      );

      setWeatherData(response.data);
      // console.log(response.data); // You can see all the weather data in console log
      console.log(response.data.weather[0].icon); // You can see all the hourly weather data in console log

      const hourlyResponse = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&appid=b167c88bb7301bc04a99e1bd24f7c97c`
      );

      console.log(hourlyResponse.data); // You can see all the weather data in console log
      set9AM(Math.floor(hourlyResponse.data.list[6].main.temp));
      set10AM(Math.floor(hourlyResponse.data.list[7].main.temp));
      set11AM(Math.floor(hourlyResponse.data.list[8].main.temp));
      set12PM(Math.floor(hourlyResponse.data.list[9].main.temp));
      set1PM(Math.floor(hourlyResponse.data.list[10].main.temp));
      set2PM(Math.floor(hourlyResponse.data.list[11].main.temp));
      set3PM(Math.floor(hourlyResponse.data.list[12].main.temp));

      setWindDegree(response.data.wind.deg);
      if (response.data.weather && response.data.weather.length > 0) {
        response.data.weather.forEach((weatherEntry) => {
          const icon = weatherEntry.icon;
          const temperature = response.data.main.temp;
          if ((icon === "01d" || icon === "01n") && temperature >= 10) {
            setWicon(clear_icon);
            setAdvice(
              "Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions."
            );
          } else if ((icon === "01d" || icon === "01n") && temperature < 10) {
            setWicon(clear_icon);
            setAdvice(
              "Extended Warm-Up: Implement a longer, more dynamic warm-up to increase body temperature and blood flow, reducing injury risk. \nLayered Clothing: Advise players to wear appropriate layers, including moisture-wicking base layers and thermal gear, to maintain warmth without restricting movement. \nHigh Tempo Play: Maintain a high tempo and encourage continuous movement to keep players warm and engaged, preventing the body from cooling down."
            );
          } else if ((icon === "02d" || icon === "02n") && temperature >= 10) {
            setWicon(cloud_icon);
            setAdvice(
              "Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions."
            );
          } else if ((icon === "02d" || icon === "02n") && temperature < 10) {
            setWicon(cloud_icon);
            setAdvice(
              "Extended Warm-Up: Implement a longer, more dynamic warm-up to increase body temperature and blood flow, reducing injury risk. \nLayered Clothing: Advise players to wear appropriate layers, including moisture-wicking base layers and thermal gear, to maintain warmth without restricting movement. \nHigh Tempo Play: Maintain a high tempo and encourage continuous movement to keep players warm and engaged, preventing the body from cooling down."
            );
          } else if (icon === "03d" || icon === "03n") {
            setWicon(drizzle_icon);
            setAdvice(
              "Footwear: Ensure players have the right boots for slippery surfaces. Adequate grip can prevent slips and injuries.\nShort Passing Game: Focus on a short passing strategy. Slippery conditions can make long balls unpredictable and harder to control.\nHigh Press: Implement a high pressing game. The opposition is more likely to make mistakes in wet conditions, which your team can capitalize on.\nProtect the Ball: Encourage players to shield the ball effectively. In drizzly conditions, maintaining possession can be challenging due to the ball's unpredictable movement."
            );
          } else if (icon === "04d" || icon === "04n") {
            setWicon(drizzle_icon);
            setAdvice(
              "Footwear: Ensure players have the right boots for slippery surfaces. Adequate grip can prevent slips and injuries.\nShort Passing Game: Focus on a short passing strategy. Slippery conditions can make long balls unpredictable and harder to control.\nHigh Press: Implement a high pressing game. The opposition is more likely to make mistakes in wet conditions, which your team can capitalize on.\nProtect the Ball: Encourage players to shield the ball effectively. In drizzly conditions, maintaining possession can be challenging due to the ball's unpredictable movement."
            );
          } else if (icon === "09d" || icon === "09n") {
            setWicon(rain_icon);
            setAdvice(
              "Adapted Tactics: Consider a more direct style of play. Heavy rain can slow down the ball on the pitch, making intricate play more difficult.\nSet Pieces: Focus on set pieces as they can become more decisive in rainy conditions. Goalkeepers and defenders might struggle with ball handling, creating opportunities.\nVisibility: Ensure players communicate loudly and clearly. Heavy rain can impair visibility and hearing, making communication on the pitch crucial.\nSafe Defending: Encourage defenders to clear the ball safely rather than attempting to play out from the back, as the wet surface can lead to mistakes."
            );
          } else if (icon === "10d" || icon === "10n") {
            setWicon(rain_icon);
            setAdvice(
              "Adapted Tactics: Consider a more direct style of play. Heavy rain can slow down the ball on the pitch, making intricate play more difficult.\nSet Pieces: Focus on set pieces as they can become more decisive in rainy conditions. Goalkeepers and defenders might struggle with ball handling, creating opportunities.\nVisibility: Ensure players communicate loudly and clearly. Heavy rain can impair visibility and hearing, making communication on the pitch crucial.\nSafe Defending: Encourage defenders to clear the ball safely rather than attempting to play out from the back, as the wet surface can lead to mistakes."
            );
          } else if (icon === "13d" || icon === "13n") {
            setWicon(snow_icon);
            setAdvice(
              "Visibility: Use a high-visibility ball and ensure players' kits contrast well with the snow. This helps in tracking the ball and player movements.\nWarm-Up Thoroughly: A comprehensive warm-up is crucial to prevent muscle injuries in cold conditions.\nAdjust the Play: Play a simpler game. Snow can make the pitch unpredictable, so reducing the risk with simpler passes and plays can be effective.\nFocus on Ball Control: Emphasize the importance of first-touch ball control. Snow can alter the speed and direction of the ball, making control more challenging."
            );
          } else {
            setWicon(cloud_icon);
            setAdvice(
              "Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions."
            );
          }
        });
      } else {
        // Default icon and advice if no weather data is available
        setWicon(cloud_icon);
        setAdvice(
          "Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions."
        );
      }

      // Change Icons based on the weather
      // if (
      //   response.data.weather[0].icon === "01d" ||
      //   response.data.weather[0].icon === "01n"
      // ) {
      //   setWicon(clear_icon);
      //   setAdvice(`Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions.`)
      //   // setBGicon(cloudBG);
      // } else if (
      //   response.data.weather[0].icon === "02d" ||
      //   response.data.weather[0].icon === "02n"
      //   ) {
      //     setWicon(cloud_icon);
      //     setAdvice(`Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions.`)
      //     // setBGicon(cloudBG);
      //   } else if (
      //     response.data.weather[0].icon === "03d" ||
      //     response.data.weather[0].icon === "03n"
      //     ) {
      //       setWicon(drizzle_icon);
      //       setAdvice(`Footwear: Ensure players have the right boots for slippery surfaces. Adequate grip can prevent slips and injuries.\nShort Passing Game: Focus on a short passing strategy. Slippery conditions can make long balls unpredictable and harder to control.\nHigh Press: Implement a high pressing game. The opposition is more likely to make mistakes in wet conditions, which your team can capitalize on.\nProtect the Ball: Encourage players to shield the ball effectively. In drizzly conditions, maintaining possession can be challenging due to the ball's unpredictable movement.`)
      //       // setBGicon(drizzleBG);
      //     } else if (
      //       response.data.weather[0].icon === "04d" ||
      //       response.data.weather[0].icon === "04n"
      //       ) {
      //         setWicon(drizzle_icon);
      //         setAdvice(`Footwear: Ensure players have the right boots for slippery surfaces. Adequate grip can prevent slips and injuries.\nShort Passing Game: Focus on a short passing strategy. Slippery conditions can make long balls unpredictable and harder to control.\nHigh Press: Implement a high pressing game. The opposition is more likely to make mistakes in wet conditions, which your team can capitalize on.\nProtect the Ball: Encourage players to shield the ball effectively. In drizzly conditions, maintaining possession can be challenging due to the ball's unpredictable movement.`)
      //         // setBGicon(drizzleBG);
      //       } else if (
      //         response.data.weather[0].icon === "09d" ||
      //         response.data.weather[0].icon === "09n"
      //         ) {
      //           setWicon(rain_icon);
      //           setAdvice(`Adapted Tactics: Consider a more direct style of play. Heavy rain can slow down the ball on the pitch, making intricate play more difficult.\nSet Pieces: Focus on set pieces as they can become more decisive in rainy conditions. Goalkeepers and defenders might struggle with ball handling, creating opportunities.\nVisibility: Ensure players communicate loudly and clearly. Heavy rain can impair visibility and hearing, making communication on the pitch crucial.\nSafe Defending: Encourage defenders to clear the ball safely rather than attempting to play out from the back, as the wet surface can lead to mistakes.`)
      //           // setBGicon(rainBG);
      //         } else if (
      //           response.data.weather[0].icon === "10d" ||
      //           response.data.weather[0].icon === "10n"
      // ) {
      //   setWicon(rain_icon);
      //   setAdvice(`Adapted Tactics: Consider a more direct style of play. Heavy rain can slow down the ball on the pitch, making intricate play more difficult.\nSet Pieces: Focus on set pieces as they can become more decisive in rainy conditions. Goalkeepers and defenders might struggle with ball handling, creating opportunities.\nVisibility: Ensure players communicate loudly and clearly. Heavy rain can impair visibility and hearing, making communication on the pitch crucial.\nSafe Defending: Encourage defenders to clear the ball safely rather than attempting to play out from the back, as the wet surface can lead to mistakes.`)
      //   // setBGicon(rainBG);
      // } else if (
      //   response.data.weather[0].icon === "13d" ||
      //   response.data.weather[0].icon === "13n"
      //   ) {
      //     setWicon(snow_icon);
      //     setAdvice(`Visibility: Use a high-visibility ball and ensure players' kits contrast well with the snow. This helps in tracking the ball and player movements.\nWarm-Up Thoroughly: A comprehensive warm-up is crucial to prevent muscle injuries in cold conditions.\nAdjust the Play: Play a simpler game. Snow can make the pitch unpredictable, so reducing the risk with simpler passes and plays can be effective.\nFocus on Ball Control: Emphasize the importance of first-touch ball control. Snow can alter the speed and direction of the ball, making control more challenging.`)
      //     // setBGicon(snowBG);
      //   } else {
      //     setWicon(cloud_icon);
      //     setAdvice(`Hydration: Ensure players are well-hydrated before the game and during breaks. Dehydration can significantly reduce performance levels and increase the risk of heat-related illnesses.\nSun Protection: Use sunscreen and consider protective clothing. Prolonged exposure to the sun can cause sunburn and contribute to fatigue.\nPace Management: Start with a conservative pace to prevent early fatigue caused by the heat. Consider more frequent substitutions to maintain a high energy level throughout the match.\nUtilize Width: Spread the play to make the opposition work harder and exploit spaces, as players tire more quickly in hot conditions.`)
      //   // setBGicon(cloudBG);
      // }
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
          <div className="main-container" style={bgCSS}>
            <form onSubmit={handleSubmit} />
            <div className="currentWeather">
              <input
                type="text"
                className="mile-end"
                placeholder="Tap to enter City Name"
                value={city}
                onChange={handleInputChange}
              />
              {/* You might wanna change h1 back to just your location */}
              <h1 className="your-location">Your Location</h1>
              <h3 className="minus-7-f">
                {Math.floor(weatherData.main.temp)}°
              </h3>
              <h3 className="snow-10">{weatherData.weather[0].description}</h3>
              <div className="highlow">
                <span className="high-intensity">
                  H: {weatherData.main.temp_max}°
                </span>
                <span className="temperature-info">
                  {" "}
                  L: {weatherData.main.temp_min}°
                </span>
              </div>
            </div>

            <div className="rectangle">
              <div className="weather-hour">
                <span className="time">9AM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time9AM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">10AM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time10AM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">11AM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time11AM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">12PM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time12PM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">1PM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time1PM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">2PM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time2PM}°</span>
              </div>

              <div className="weather-hour">
                <span className="time">3PM</span>
                <div className="weather-icon">
                  <img alt="" src={wicon} />
                </div>
                <span className="temp-hour">{time3PM}°</span>
              </div>
            </div>

            <div className="tipsBox">
              <p className="warm-up-tips">{advice}</p>
            </div>
            <div className="precwindDiv">
              <div className="precipitationBox">
                <span className="precipitation-info">humidity</span>
                <span className="precipitation-info-14">
                  {weatherData.main.humidity}%
                </span>
              </div>
              <div className="windBox">
                <span className="wind-info">wind</span>
                <img alt="" src={wind_icon} style={windCSS} />
                <div className="flex-column-ef">
                  <span className="mph-wind">{weatherData.wind.speed}m/s</span>
                  <span className="mph-gusts">
                    {weatherData.wind.gust} mph gusts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="main-container">
          <p>Something went horribly wrong.</p>
        </div>
      )}
    </div>
  );
}
