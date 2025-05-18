import React, { useState } from 'react';
import './myapp.css';
import { FaSearch } from 'react-icons/fa';
import scattered from '../Assets/scattered.png';
import cloud from '../Assets/cloud.png';
import mist2 from '../Assets/mist2.png';
import clear from '../Assets/clear.png';
import rain from '../Assets/rain.png';
import error404 from '../Assets/404.avif';

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("");
  const [error, setError] = useState("");
  const Api_Key = '1bc7c04b881e1087d2b7480dc2ae61dd';

  const incomingData = (event) => {
    setSearch(event.target.value);
  };

  const apiCall = async () => {
    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${Api_Key}&units=metric`);
    const Data = await get.json();
    setShow(Data);

    if (search === "") {
      setError("Please enter city name.");
    } else if (Data.cod === '404') {
      setError("error404");
    } else {
      setError("");
    }
  };

  let weatherImg = '';
  if (show && show.weather) {
    const desc = show.weather[0].description.toLowerCase();
    if (desc === 'clear sky') weatherImg = clear;
    else if (desc === 'overcast clouds' || desc === 'haze') weatherImg = cloud;
    else if (desc === 'rain' || desc === 'light rain') weatherImg = rain;
    else if (desc === 'mist') weatherImg = mist2;
    else if (desc === 'scattered clouds') weatherImg = scattered;
  }

  return (
    <div className="weather-container">
      <div className="weather-input-container">
        <input
          placeholder="Enter your city,country"
          onChange={incomingData}
          className="weather-input"
        />
        <button className="weather-button" onClick={apiCall}>
          <FaSearch size={22} color="#fff" />
        </button>
      </div>

      {error && (
        <div className="weather-error">
          {error === "error404" ? (
            <img src={error404} alt="Not Found" />
          ) : (
            <h2>{error}</h2>
          )}
        </div>
      )}

      {show && show.weather && (
        <div className="weather-display">
          <h2 className="weather-city">{show.name}</h2>
          <img src={weatherImg || cloud} alt="Weather" className="weather-image" />
          <h2 className="weather-temp">{Math.trunc(show.main.temp)}°C</h2>
          <h3 className="weather-desc">{show.weather[0].description}</h3>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
