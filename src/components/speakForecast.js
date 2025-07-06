export const speakForecast = (weatherData, tempUnit, convertTemperature) => {
    if (!weatherData) return; // prevents speaking if weather data is not available
  
    const weatherDescription = weatherData.weather[0].description;
    const currentTemp = Math.round(convertTemperature(weatherData.main.temp));
    const feelsLikeTemp = Math.round(convertTemperature(weatherData.main.feels_like));
  
    // format the weather description with better sentence flow based on conditions
    let forecastText = '';
  
    switch (weatherDescription) {
        case 'clear sky':
          forecastText = `The sky is clear in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'few clouds':
          forecastText = `There are a few clouds in the sky in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, but it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'scattered clouds':
          forecastText = `The sky is partly cloudy in ${weatherData.name}. It's currently ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'broken clouds':
          forecastText = `The sky is mostly cloudy in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'shower rain':
          forecastText = `It's showering in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, but it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'rain':
          forecastText = `It's raining in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'thunderstorm':
          forecastText = `There is a thunderstorm in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, but it feels like ${feelsLikeTemp}°${tempUnit}. Stay safe!`;
          break;
        case 'snow':
          forecastText = `It's snowing in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        case 'mist':
          forecastText = `There's mist in ${weatherData.name}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
        default:
          forecastText = `The weather in ${weatherData.name} is currently ${weatherDescription}. The temperature is ${currentTemp}°${tempUnit}, and it feels like ${feelsLikeTemp}°${tempUnit}.`;
          break;
    }
  
    // text-to-Speech function to read aloud the forecast
    const utterance = new SpeechSynthesisUtterance(forecastText);
    utterance.lang = 'en-UK';
    window.speechSynthesis.speak(utterance);
};
  