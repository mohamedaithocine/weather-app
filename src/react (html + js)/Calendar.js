import axios from "axios";
import React, { useEffect, useState } from "react";
import CalenderItem from "./CalenderItem";

function Calendar() {
  const [matches, setMatches] = useState([]);

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
      const matchesData = response.data.response.map((match) => ({
        date: match.fixture.date.split("T")[0],
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
        <div className="row">
          {matches.map((match, index) => (
            <div className="col md-4" key={index}>
              <CalenderItem
                title={`${match.homeTeam} vs ${match.awayTeam} `}
                date={match.date}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calendar;
