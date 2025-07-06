import React from 'react';
import Wind from './Wind';

const WindForecast = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div>
      <h4>Wind Forecast</h4>
      <div className="box" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Render Wind component */}
        <Wind
          windSpeed={weatherData.wind.speed}
          windDirection={weatherData.wind.deg}
        />
      </div>
    </div>
  );
};

export default WindForecast;
