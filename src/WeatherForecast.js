import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  if (!props.coords) {
    return null;
  }

  function handleResponse(response) {
    console.log(response.data);
  }

  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let longitude = props.coords.lon;
  let latitude = props.coords.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleResponse);

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day"> Thu </div>
          <div className="WeatherForecast-icon">
            <WeatherIcon code="01d" size={36} />
          </div>
          <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-temperature-max"> 18° </span>
            <span className="WeatherForecast-temperature-min"> 12° </span>
          </div>
        </div>
      </div>
    </div>
  );
}
