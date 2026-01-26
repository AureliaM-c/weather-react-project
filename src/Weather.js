import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
    setLoading(false);
    setError(null);
  }

  function search() {
    setLoading(true);
    const apiKey = "1ee4264117b73d2263eecd562f31ef5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(() => {
        setError("City not found. Try another one 🧐");
        setWeatherData({ ready: false });
        setLoading(false);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control"
              autoFocus="true"
              onChange={handleCityChange}
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {!weatherData.ready && !loading && search()}
      {loading && <p>Loading...</p>}
      {weatherData.ready && <WeatherInfo data={weatherData} />}
    </div>
  );
}
