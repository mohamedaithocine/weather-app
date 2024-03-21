import "../css/NavBar.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import locationPinImage from "../assets/images/Location.svg";
import calendarImage from "../assets/images/Calendar.svg";
import footballImage from "../assets/images/Football.svg";

import Home from "./Home";
import Calendar from "./Calendar";
import SavedLocations from "./SavedLocations";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/SavedLocations" element={<SavedLocations />} />
        </Routes>
      </div>

      <div className="navBar">
        <NavLink to="/Calendar" className="calendarButton">
          <img
            src={calendarImage}
            alt="Matches"
            className="calendarButtonIMG"
          />
        </NavLink>

        <NavLink to="/" className="footballButton">
          <img src={footballImage} alt="Home" className="footballButtonIMG" />
        </NavLink>

        <NavLink to="/SavedLocations" className="locationButton">
          <img
            src={locationPinImage}
            alt="Home"
            className="locationButtonIMG"
          />
        </NavLink>
      </div>
    </Router>
  );
}

export default App;
