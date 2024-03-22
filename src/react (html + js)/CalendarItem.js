import React from "react";
import "../css/CalendarItem.css";

// CalenderItem component to display match data
function CalenderItem(props) {
  return (
    <>
      <div className="card my-2" style={{ width: "18rem" , height: "20rem", backgroundColor:"#dafcca"}}>
        <div className="TeamLogos">
          <img src={props.homeTeamimg} className="card-img-top" alt="" />
          <img src={props.awayTeamimg} className="card-img-top" alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.title}</h5>
          <h5 className="card-date">{props.date}</h5>
          <p className="card-text fw-bold location-color">{props.location}</p>
          <pre>temp: {props.weather.main.temp}{' °C\n'}
          pressure: {props.weather.main.pressure}{' hPa\n'}
          humidity: {props.weather.main.humidity}{' %\n'}
          feels-like: {props.weather.main.temp}{'°C'}
          </pre>
        </div>
      </div>
    </>
  );
}

export default CalenderItem;
