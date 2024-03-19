import React from "react";
import premierLeagueLogo from "../images/premier-league-logo.png";

function CalenderItem(props) {
  return (
    <>
      <div className="card my-2" style={{ width: "18rem" }}>
        <img
          style={{ background: "none" }}
          src={premierLeagueLogo}
          className="card-img-top"
          alt="Premier League Logo"
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">Weather Data to Display here.</p>
          <a href="/#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}

export default CalenderItem;
