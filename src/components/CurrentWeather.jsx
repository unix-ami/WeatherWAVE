import React from 'react';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  // Get the weather icon ID
  const iconId = weatherData.weather[0].icon; // Assuming there's at least one weather object
  const iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`; // Construct the icon URL
  const iconDesc = weatherData.weather[0].description;

  return (
    <div>
      <h4>Weather Conditions</h4>
      <div className="box block">
        <div>
          <p>Visibility: {weatherData.visibility / 1000}/10km</p>
          <p>Skyview: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <img src="./humidity.png" alt="humidity-image" />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
