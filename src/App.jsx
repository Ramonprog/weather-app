import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c396aee34faa81741d8e8a540358d803`;

  const searchLocation = async (event) => {
    try {
      if (event.key === "Enter") {
        const response = await axios.get(url);
        const res = response.data;
        setData(res);
        setLocation("");
        console.log(res);
      }
    } catch (error) {}
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * (5 / 9));
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>
              {fahrenheitToCelsius(data.main.temp)} <span>°C</span>
            </h1>
          </div>
          <div className="description">
            <p>{data.weather[0].description}</p>
          </div>
        </div>
        <div className="botton">
          <div className="fells">
            <p className="bold">
              {fahrenheitToCelsius(data.main.feels_like)}°C
            </p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind.speed}MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
