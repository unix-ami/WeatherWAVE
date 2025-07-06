import React from 'react';

const Header = ({ weatherData, tempUnit, convertTemperature, speakForecast }) => {
  const iconId = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
  const iconDesc = weatherData.weather[0].description;

  // Function to determine pressure category and description
  const getPressureDescription = (pressure) => {
    if (pressure >= 1020) {
      return { category: 'High', description: 'Fair, clear, dry weather.' };
    } else if (pressure === 1013) {
      return { category: 'Normal', description: 'Mild and variable weather.' };
    } else if (pressure >= 1000 && pressure <= 1012) {
      return { category: 'Low', description: 'Unsettled weather, possible rain or storms.' };
    } else if (pressure < 1000 && pressure >= 950) {
      return { category: 'Very Low', description: 'Severe weather, storms, cyclones.' };
    } else if (pressure < 950) {
      return { category: 'Extreme Low', description: 'Hurricanes, typhoons, extreme storms.' };
    }
    return { category: '', description: '' };
  };

  const pressureInfo = getPressureDescription(weatherData.main.pressure);

  return (
    <div className="header main" style={{
      backgroundImage: `url(${iconUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'calc(100% - 1px) calc(100% - 1px)' // Offset from the bottom-right
    }}> 
      <div className="header-content">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>

        <div className="weather-main">

          <div className="weather-details">
            <div className="info-container">
              <button onClick={() => speakForecast(weatherData, tempUnit, convertTemperature)}>
                <p> Listen to Forecast </p>
              </button>
            </div>
          </div>

          <div className="temperature-section">
            <h1>{Math.round(convertTemperature(weatherData.main.temp))}°{tempUnit}</h1>
            <p>Feels like {Math.round(convertTemperature(weatherData.main.feels_like))}°{tempUnit}</p>
          </div>

          <div className="weather-details">
            <div className="info-container">
              <p> {pressureInfo.category} Pressure: {weatherData.main.pressure} hPa </p>
              <button className="info-button">ⓘ</button>
              <div className="info-text"> 
                {pressureInfo.category !== '' && (
                  <> 
                  <p> Currently indicates {pressureInfo.description} </p> <br />
                  </>
                )}
                <span> Atmospheric pressure at sea level, affects weather patterns, with lower pressure increasing the likelihood of severe weather 
                </span>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Header;
