import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Settings from './components/settings';
import Map from './components/Map';
import Sun from './components/Sun';
import { speakForecast } from './components/speakForecast';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import WeeklyForecast from './components/WeeklyForecast';
import WindForecast from './components/WindForecast';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Header from './components/Header';
import FishingConditions from './components/FishingConditions';
import Clock  from './components/Clock';
import SwellWarning from './components/SwellWarning';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ temperatureUnit, setTemperatureUnit }) => { 

  // states - using Southend-on-Sea for default values
  const [city, setCity] = useState('Southend-on-Sea');
  const [weatherData, setWeatherData] = useState(null);
  const [UV_data, setUV_data] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState(null);
  const [weeklyForecastData, setWeeklyForecastData] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(1743054215);
  const [sunsetTime, setSunsetTime] = useState(1743099671);
  const [offlineMode, setOfflineMode] = useState(false); 
  const mapRef = useRef();
  const [swellHeight, setSwellHeight] = useState(null);
  const [showSwellWarning, setShowSwellWarning] = useState(false);
  const googleMapsUrl = `https://www.google.co.uk/maps/place/${city}`;

  // temperature conversion
  const tempUnit = temperatureUnit; // Default to Celsius

  const convertTemperature = (temp) => {
    if (tempUnit === 'F') {
      return (temp * 9) / 5 + 32; 
    }
    return temp; 
  };

  // Function to fetch general weather data
  const fetchWeatherData = useCallback(async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data; // Return general weather data
  }, []);

  // Function to fetch UV weather data
  const fetchUVdata = useCallback(async (lat, lon) => {
    const response = await axios.get(
      `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
    );
    return response.data; // Return current weather data
  }, []);

  // Function to fetch hourly forecast data
  const fetchHourlyForecastData = useCallback(async (lat, lon) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=24`
    );
    return response.data; // Return the forecast data
  }, []);

  // Function to fetch forecast weekly data
  const fetchWeeklyForecastData = useCallback(async (lat, lon) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=40`
    );
    return response.data; // Return the forecast data
  }, []);

  const fetchMarineData = useCallback(async (lat, lon) => {
    //For testing
    // return 5.2;
    const marineUrl = `https://api.worldweatheronline.com/premium/v1/marine.ashx?key=543e5cc9746d460f975200404250104&q=${lat},${lon}&format=json`;
    const response = await axios.get(marineUrl);
    return response.data.data.weather[0].hourly[0].swellHeight_m; // Gets current hour swell height
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Fetch current weather data
      const weatherResponse = await fetchWeatherData(city);
      setWeatherData(weatherResponse);

      // Extract latitude and longitude
      const lat = weatherResponse.coord.lat;
      const lon = weatherResponse.coord.lon;

      const sunriseTime = weatherResponse.sys.sunrise;
      const sunsetTime = weatherResponse.sys.sunset;

      const marineSwell = await fetchMarineData(lat, lon);
      setSwellHeight(marineSwell);
  
      if (parseFloat(marineSwell) >= 4) {
        setShowSwellWarning(true);
      } else {
        setShowSwellWarning(false);
      }

      // Update the state with the new sunrise and sunset
      setSunriseTime(sunriseTime);
      setSunsetTime(sunsetTime);

      // Fetch UV using latitude and longitude
      const UVdataResponse = await fetchUVdata(lat, lon);
      setUV_data(UVdataResponse);

      // Fetch hourly forecast data using latitude and longitude
      const hourlyForecastResponse = await fetchHourlyForecastData(lat, lon);
      setHourlyForecastData(hourlyForecastResponse);

      // Fetch weekly forecast data using latitude and longitude
      const weeklyForecastResponse = await fetchWeeklyForecastData(lat, lon);
      setWeeklyForecastData(weeklyForecastResponse)

      // Console logs for verifying JSON output and for future references.
      console.log('General data: ', weatherResponse);
      console.log('UV data: ', UVdataResponse);
      console.log('Hourly Forecast Data: ', hourlyForecastResponse);
      console.log('Weekly Forecast Data: ', weeklyForecastResponse);

      if (mapRef.current) {
        mapRef.current.flyToLocation(lat, lon);
      }

    } catch (error) {
      console.error(error);
    }
  }, [
    city,
    fetchHourlyForecastData,
    fetchMarineData,
    fetchUVdata,
    fetchWeatherData,
    fetchWeeklyForecastData,
  ]);

  useEffect(() => {
    if (offlineMode) {
      console.log("Offline mode enabled. Skipping data fetch.");
      return; // Skip refresh if offline mode is enabled
    }

    console.log("Online mode enabled. Fetching data...");
    fetchData();
  
    const intervalId = setInterval(() => {
      fetchData();
    }, 3600000); // 1 hour
  
    return () => clearInterval(intervalId);
  }, [fetchData, offlineMode]); // offlineMode as a dependency 

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Fetch weather data for the user's location
              const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
              );

              const cityName = weatherResponse.data.name;
              setCity(cityName); // Update city name
              setWeatherData(weatherResponse.data); // Update weather data

              const lat = weatherResponse.data.coord.lat;
              const lon = weatherResponse.data.coord.lon;

              // Fetch sunrise and sunset times
              setSunriseTime(weatherResponse.data.sys.sunrise);
              setSunsetTime(weatherResponse.data.sys.sunset);

              // Fetch marine data
              const marineSwell = await fetchMarineData(lat, lon);
              setSwellHeight(marineSwell);
              setShowSwellWarning(parseFloat(marineSwell) >= 4);

              // Fetch UV data
              const UVdataResponse = await fetchUVdata(lat, lon);
              setUV_data(UVdataResponse);

              // Fetch hourly forecast data
              const hourlyForecastResponse = await fetchHourlyForecastData(lat, lon);
              setHourlyForecastData(hourlyForecastResponse);

              // Fetch weekly forecast data
              const weeklyForecastResponse = await fetchWeeklyForecastData(lat, lon);
              setWeeklyForecastData(weeklyForecastResponse);

              // Update map location
              if (mapRef.current) {
                mapRef.current.flyToLocation(lat, lon);
              }

            } catch (error) {
              console.error("Error fetching weather data for user location:", error);
            }
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("Geolocation permission denied.");
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              console.error("Position unavailable.");
            } else if (error.code === error.TIMEOUT) {
              console.error("Geolocation request timed out.");
            } else {
              console.error("An unknown geolocation error occurred:", error);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [
    fetchHourlyForecastData,
    fetchMarineData,
    fetchUVdata,
    fetchWeeklyForecastData,
  ]); // Run only once on component mount
  
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  
  return (
    <>
      <Clock/>

      <Settings 
        city={city} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        temperatureUnit={temperatureUnit} 
        setTemperatureUnit={setTemperatureUnit}
        offlineMode={offlineMode} 
        setOfflineMode={setOfflineMode}
      />    

      {showSwellWarning && (
        <SwellWarning
        swellHeight={swellHeight}
        onClose={() => setShowSwellWarning(false)}
      />
      )}

      {/* Display today's general weather */}
      {weatherData !== null && (
        <Header 
          weatherData={weatherData} 
          tempUnit={tempUnit} 
          convertTemperature={convertTemperature} 
          speakForecast={speakForecast} 
        />
      )}

    <div className="container">

      {/* Display wind data */}
      {weatherData !== null && (
        <WindForecast weatherData={weatherData} />
      )}

      {/* Display Fishing Conditions */}
      {weatherData && (
        <FishingConditions 
          minTemp={Math.round(convertTemperature(weatherData.main.temp_min))} 
          maxTemp={Math.round(convertTemperature(weatherData.main.temp_max))} 
          tempUnit={tempUnit} 
        />
      )}

      {/* Display Sun data */}
      {UV_data !== null && (
        <div> 
          <h4>Daylight Hours</h4>
          <div className="box block">
            <Sun 
            sunriseUnix={sunriseTime}
            sunsetUnix={sunsetTime}
            uvi={UV_data.now.uvi}
          />
          </div>
        </div>
      )}

      {/* Display weekly forecast data */}
      {weeklyForecastData !== null && (
        <WeeklyForecast 
          weeklyForecastData={weeklyForecastData} 
          convertTemperature={convertTemperature} 
          tempUnit={tempUnit} 
        />
      )}

      {/* Display hourly forecast data */}
      {hourlyForecastData !== null && (
        <HourlyForecast 
          hourlyForecastData={hourlyForecastData} 
          convertTemperature={convertTemperature} 
          tempUnit={tempUnit} 
        />
      )}

      {/* Display current weather forecast */}
      {weatherData !== null && (
        <CurrentWeather weatherData={weatherData} />
      )}
    
    {/*Map data*/}
    {weatherData !== null &&(
      (() => {
        return (
          <>
            <div className='map'>
              <h4>Weather Map</h4>
              <div className='google-map'> 
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Show {city} in Google Maps (new tab) ↗ </a>
              </div>
              <Map ref={mapRef} />
            </div>
            <br/> <br/> <br/> <br/> <br/>
          </>
        );
      })()
    )}

    </div>
    </>
  );
};

export default Weather;