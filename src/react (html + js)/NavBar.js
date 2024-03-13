import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'; 
import locationPinImage from '../images/location.svg';
import calenderImage from '../images/calendar.svg';
import footballImage from '../images/football.svg';

import Home from './Home';
import Calendar from './Calendar';
import SavedLocations from './SavedLocations';



function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />  
            <Route path="/Calendar" element={<Calendar/>} />
            <Route path="/SavedLocations" element={<SavedLocations/>} />
          </Routes>
         </div>
      <div>
      <div className="navigation">
        <Link to="/Calendar">
          <img src={calenderImage} alt="App" width={40} height={40}/>
        </Link>
        <Link to="/">
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

