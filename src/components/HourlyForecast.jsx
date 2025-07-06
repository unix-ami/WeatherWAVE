import React from 'react';

const HourlyForecast = ({ hourlyForecastData, convertTemperature, tempUnit }) => {
  return (
    <div className='hourlyForecast'> 
      <h4>Hourly FORECAST</h4>
      <div className="box">
        {hourlyForecastData.list.slice(1, 13).map((hour, index) => {  
          const currentTime = new Date();
          currentTime.setHours(currentTime.getHours() + index + 1);
          const currentHour = currentTime.toLocaleTimeString([], { hour: '2-digit' });

          const iconId = hour.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
          const iconDesc = hour.weather[0].description;

          return (
            <div key={index} className="tile">
              <p className="weather-info">
                <span className="time">{currentHour}:00</span>
                <span className="temp">{Math.round(convertTemperature(hour.main.temp - 273.15))}°{tempUnit}</span>
              </p>
              <img src={iconUrl} alt={`${iconDesc}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
