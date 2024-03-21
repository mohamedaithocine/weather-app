import React, { useEffect, useState } from "react";
import axios from "axios";
import imgNotAvailable from "../images/image_not_available.png";
function CalenderItem(props) {
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    image: "",
  });

  const fetchVenue = async () => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/venues",
      params: {
        id: props.venue,
      },
      headers: {
        // Azlan's api key: "1dae4b29e9msh18369a4e952eb73p1f44bfjsnf5cbb3cfb218", exhausted for today
        // Add your api key below
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const data = response.data;
      if (data && data.response && data.response.length > 0) {
        const venue = data.response[0];
        var img = venue.image;
        if (!img) {
          img = imgNotAvailable;
        }
        const updatedVenueData = {
          name: venue.name,
          address: venue.address,
          city: venue.city,
          country: venue.country,
          image: img,
        };
        setVenueData(updatedVenueData);
      } else {
        console.error("Venue data not found");
      }
    } catch (error) {
      console.error("Error fetching venue data:", error);
    }
  };
  useEffect(() => {
    fetchVenue();
    // eslint-disable-next-line
  }, [props.venueId]);

  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <img src={venueData.image} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title fw-bold">{props.title}</h5>
        <h5 className="card-title">{props.date}</h5>
        <p className="card-text">
          <strong>{venueData.name}</strong>, {venueData.country} <br />
          {venueData.address}
        </p>
        <a href="/#" className="btn btn-primary">
          See Weather →
        </a>
      </div>
    </div>
  );
}

export default CalenderItem;
