import React from "react";
import "./Card.css"; // CSS file for styling

const Card = (props) => {
  const {
    image,
    missionName,
    flightNumber,
    missionId,
    launchYear,
    successfulLaunch,
    successfulLanding,
  } = props;

  return (
    <div className="card">
      <div className="image-container">
        <img src={image} alt="Mission" className="mission-image" />
      </div>
      <div className="mission-info">
        <h2 className="missionname">
          {missionName} #{flightNumber}
        </h2>
        <h3>Mission IDs:</h3>
        <ul>
          {missionId.map((missionId) => (
            <li key={missionId}>{missionId}</li>
          ))}
        </ul>
        <p>
          <b>Launch Year:</b> {launchYear}
        </p>
        <p>
          <b>Successful Launch:</b> {successfulLaunch ? "Yes" : "No"}
        </p>
        <p>
          <b>Successful Landing:</b> {successfulLanding ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default Card;
