import axios from "axios";
import React, { useEffect, useState } from "react";
import CalenderItem from "./CalendarItem";

function Calendar() {
  const [matches, setMatches] = useState([]); // state to store matches data

  // Function to fetch weather data for a given location
  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b167c88bb7301bc04a99e1bd24f7c97c`);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  // Function to fetch match data
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: {
        league: "39",
        season: "2023",
        from: "2024-03-20",
        to: "2024-04-01",
        timezone: "Europe/London",
        status: "NS",
      },
      headers: {
        "X-RapidAPI-Key": "1dae4b29e9msh18369a4e952eb73p1f44bfjsnf5cbb3cfb218",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // processing match data and fetch weather for each match
      const matchesData = await Promise.all(response.data.response.map(async (match) => {
        const weatherData = await fetchWeather(match.fixture.venue.city);
        console.log(weatherData)
        return {
          date: match.fixture.date.split("T")[0], // extracting date of the match
          homeTeam: match.teams.home.name, // Home team name
          homeTeamimg: match.teams.home.logo, // Home team logo
          awayTeam: match.teams.away.name, // Away team name
          awayTeamimg: match.teams.away.logo, // Away team logo
          location: match.fixture.venue.city, // Match location
          weather: weatherData // Weather data for the match location
        };
      }));
      setMatches(matchesData); // setting matches data in state
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetching data on component mount
  }, []);

  return (
    <>
      <div>
        <h1>Calendar</h1>
      </div>
      <div className="container my-3">
        <h3>Upcoming Matches:</h3>
        <div className="row">
          {matches.slice(0, 9).map((match, index) => (
            <div className="col md-4" key={index}>
              <CalenderItem
                title={`${match.homeTeam} vs ${match.awayTeam}`}
                date={match.date}
                location={match.location}
                homeTeamimg={match.homeTeamimg}
                awayTeamimg={match.awayTeamimg}
                weather={match.weather}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;
