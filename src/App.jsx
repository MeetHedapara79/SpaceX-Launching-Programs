import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const App = () => {
  const [launchYearFilter, setLaunchYearFilter] = useState('');
  const [successfulLaunchFilter, setSuccessfulLaunchFilter] = useState('');
  const [successfulLandingFilter, setSuccessfulLandingFilter] = useState('');
  const [missionData, setMissionData] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);

  useEffect(() => {
    fetchMissionData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [launchYearFilter, successfulLaunchFilter, successfulLandingFilter]);

  const fetchMissionData = async () => {
    try {
      const url = createFilterURL();
      const response = await fetch(url);
      const data = await response.json();
      setMissionData(data);
      setFilteredMissions(data);
    } catch (error) {
      console.log("Error fetching mission data:", error);
    }
  };

  const applyFilters = () => {
    const filteredData = missionData.filter((mission) => {
      const matchesLaunchYear =
        launchYearFilter === "" || mission.launch_year === launchYearFilter;
      const matchesSuccessfulLaunch =
        successfulLaunchFilter === "" ||
        mission.launch_success === (successfulLaunchFilter === "true");
      const matchesSuccessfulLanding =
        successfulLandingFilter === "" ||
        mission.rocket.first_stage.cores[0].land_success ===
        (successfulLandingFilter === "true");

      return (
        matchesLaunchYear && matchesSuccessfulLaunch && matchesSuccessfulLanding
      );
    });

    setFilteredMissions(filteredData);
  };


  const createFilterURL = () => {
    const baseURL = "https://api.spacexdata.com/v3/launches?limit=100";
    let filterURL = baseURL;

    if (launchYearFilter) {
      filterURL += `&launch_year=${launchYearFilter}`;
    }

    if (successfulLaunchFilter) {
      filterURL += `&launch_success=${successfulLaunchFilter}`;
    }

    if (successfulLandingFilter) {
      filterURL += `&land_success=${successfulLandingFilter}`;
    }

    return filterURL;
  };


  const handleLaunchYearFilterChange = (year) => {
    if (launchYearFilter === year) {
      setLaunchYearFilter("");
    } else {
      setLaunchYearFilter(year);
    }
  };


  const handleSuccessfulLaunchFilterChange = (value) => {
    if (successfulLaunchFilter === value) {
      // If the same value is clicked, remove the successful launch filter
      setSuccessfulLaunchFilter("");
    } else {
      setSuccessfulLaunchFilter(value);
    }
  };


  const handleSuccessfulLandingFilterChange = (value) => {
    if (successfulLandingFilter === value) {
      // If the same value is clicked, remove the successful landing filter
      setSuccessfulLandingFilter("");
    } else {
      setSuccessfulLandingFilter(value);
    }
  };


  const renderYearButtons = () => {
    return Array.from({ length: 15 }, (_, index) => 2006 + index).map(
      (year) => (
        <button
          key={year}
          className={`filter-button ${launchYearFilter === year.toString() ? "active" : ""
            }`}
          onClick={() => handleLaunchYearFilterChange(year.toString())}
        >
          {year}
        </button>
      )
    );
  };

  const renderBooleanButtonsLunch = (filterType) => {
    return (
      <>
        <button
          className={filterType === "true" ? "active" : ""}
          onClick={() => handleSuccessfulLaunchFilterChange("true")}
        >
          True
        </button>
        <button
          className={filterType === "false" ? "active" : ""}
          onClick={() => handleSuccessfulLaunchFilterChange("false")}
        >
          False
        </button>
      </>
    );
  };

  const btnlist = document.querySelectorAll('.but');
  btnlist.forEach(btnl =>{
    btnl.addEventListener('click', () => {
      btnl.classList.add('.special');
    });
  });

  const renderBooleanButtonsLanding = (filterType) => {
    return (
      <>
        <button
          className={filterType === "true" ? "active" : ""}
          onClick={() => handleSuccessfulLandingFilterChange("true")}
        >
          True
        </button>
        <button
          className={filterType === "false" ? "active" : ""}
          onClick={() => handleSuccessfulLandingFilterChange("false")}
        >
          False
        </button>
      </>
    );
  };


  return (
    <div className="main">
      <h1>SpacX Launch Programs</h1>
      <div className="container">
        {/* Filter Navigator */}
        <div className="filcon">
          <div className="filter-navigator">
            <h2>Filter</h2>
            <div className="filter-section">
              <h3 className='filh'>Launch Year</h3>
              <div className="year-buttons but">{renderYearButtons()}</div>
            </div>
            <div className="filter-section">
              <h3 className='filh'>Successful Launch</h3>
              <div className="boolean-buttons but">
                {renderBooleanButtonsLunch(successfulLaunchFilter)}
              </div>
            </div>
            <div className="filter-section">
              <h3 className='filh'>Successful Landing</h3>
              <div className="boolean-buttons but">
                {renderBooleanButtonsLanding(successfulLandingFilter)}
              </div>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="card-container">
          {filteredMissions.map((mission) => (
            <Card
              key={mission.flight_number}
              image={mission.links.mission_patch_small}
              missionName={mission.mission_name}
              flightNumber={mission.flight_number}
              missionId={mission.mission_id}
              launchYear={mission.launch_year}
              successfulLaunch={mission.launch_success}
              successfulLanding={
                mission.rocket.first_stage.cores[0].land_success
              }
            />
          ))}
        </div>
      </div>
      <p className="dname">
        <b>Developed by:</b> Meet Hedapara
      </p>
    </div>
  );
};

export default App;