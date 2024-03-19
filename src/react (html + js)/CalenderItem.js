import React from "react";

function CalenderItem(props) {
  return (
    <>
      <div className="card my-2" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..." />
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
