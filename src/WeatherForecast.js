import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";
import axios from "axios";

export default function WeatherForecast(props) {
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!props.coords) {
      return;
    }

    let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
    let longitude = props.coords.lon;
    let latitude = props.coords.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(function (response) {
      let forecastByDay = {};

      response.data.list.forEach(function (item) {
        let date = new Date(item.dt * 1000);
        let dateString = date.toDateString();

        if (!forecastByDay[dateString]) {
          forecastByDay[dateString] = [];
        }
        forecastByDay[dateString].push(item);
      });

      let dailyForecasts = [];
      let dates = Object.keys(forecastByDay);

      dates.forEach(function (dateString) {
        if (dailyForecasts.length < 5) {
          let dayForecasts = forecastByDay[dateString];

          let maxTemp = dayForecasts[0].main.temp_max;
          let minTemp = dayForecasts[0].main.temp_min;

          dayForecasts.forEach(function (item) {
            if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
            if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
          });

          let dailyData = {
            ...dayForecasts[0],
            main: {
              ...dayForecasts[0].main,
              temp_max: maxTemp,
              temp_min: minTemp,
            },
          };

          dailyForecasts.push(dailyData);
        }
      });

      setForecast(dailyForecasts);
    });
  }, [props.coords]);

  if (!forecast) {
    return null;
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.map(function (dailyForecast, index) {
          return (
            <div className="col" key={index}>
              <WeatherForecastDay data={dailyForecast} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
