import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; 
import locationPinImage from './images/location-pin.png';
import calenderImage from './images/calendar.png';
import footballImage from './images/football.png';

import Home from './Home';
import Calender from './Calender';
import SavedLocations from './SavedLocations';



function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />  
            <Route path="/App" element={<Home/>} />  
            <Route path="/Calender" element={<Calender/>} />
            <Route path="/SavedLocations" element={<SavedLocations/>} />
          </Routes>
         </div>
      <div>
      <div className="navigation">
        <Link to="/Calender">
          <img src={calenderImage} alt="App" width={40} height={40}/>
        </Link>
        <Link to="/App">
          <img src={footballImage} alt="App" width={40} height={40}/>
        </Link>
        <Link to="/SavedLocations">
          <img src={locationPinImage} alt="App" width={40} height={40}/>
        </Link>
        </div>
      </div>
    </Router>

    );
  };

  export default App;

