import axios from "axios";
import React, { useEffect, useState } from "react";
import CalendarItem from "./CalendarItem";

function Calendar() {
  const [matches, setMatches] = useState([]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: {
        league: "39", // 39 -> English Premier League
        season: "2023", // Current Season
        from: "2024-03-20", // Matches for the coming month
        to: "2024-04-01",
        timezone: "Europe/London",
        status: "NS", // Not Played yet.
      },
      headers: {
        // Azlan's api key: "1dae4b29e9msh18369a4e952eb73p1f44bfjsnf5cbb3cfb218", exhausted for today
        // Add your api key below
        "X-RapidAPI-Key": "1dae4b29e9msh18369a4e952eb73p1f44bfjsnf5cbb3cfb218",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const matchesData = response.data.response.map((match) => ({
        date: match.fixture.date.split("T")[0],
        venueId: match.fixture.venue.id,
        homeTeam: match.teams.home.name,
        awayTeam: match.teams.away.name,
      }));
      setMatches(matchesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Calendar</h1>
      </div>
      <div className="container my-3">
        <h3>Upcoming Matches:</h3>
        <div className="row justify-content-md-center">
          {matches.slice(0, 9).map((match, index) => (
            <div className="col md-3 align-self-start" key={index}>
              <CalendarItem
                className="h-100 d-inline-block"
                title={`${match.homeTeam} vs ${match.awayTeam}`}
                date={match.date}
                venue={match.venueId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;
