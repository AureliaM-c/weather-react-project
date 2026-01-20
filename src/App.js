import React from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Weather defaultCity="New York" />

      <footer>
        This project was coded by{" "}
        <a
          href="https://github.com/AureliaM-c"
          target="_blank"
          rel="noreferrer"
        >
          Aurelia Mourey
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/AureliaM-c/weather-react-project"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on Github
        </a>
      </footer>
    </div>
  );
}

export default App;
