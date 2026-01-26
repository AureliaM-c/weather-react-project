import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";

export default function WeatherForecast() {
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
