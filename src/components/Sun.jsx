import React, { useState, useEffect } from 'react';

const Sun = ({ sunriseUnix, sunsetUnix, uvi }) => {
  // Function to convert UNIX timestamp to HH:mm format
  const formatTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);

  useEffect(() => {
    // Convert and set the sunrise and sunset times
    if (sunriseUnix && sunsetUnix) {
      setSunriseTime(formatTime(sunriseUnix));
      setSunsetTime(formatTime(sunsetUnix));
    }
  }, [sunriseUnix, sunsetUnix]); // Re-run the effect if UNIX timestamps change

  // Get the current time
  const currentUnix = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds 

  // Determine whether the current time is before sunrise, after sunrise but before sunset, or after sunset
  const isBeforeSunrise = currentUnix < sunriseUnix; // Before sunrise
  const isAfterSunriseBeforeSunset = currentUnix >= sunriseUnix && currentUnix < sunsetUnix; // After sunrise, but before sunset
  const isAfterSunset = currentUnix >= sunsetUnix; // After sunset

  console.log(isBeforeSunrise, isAfterSunriseBeforeSunset, isAfterSunset); // Debug logs

  return (
    <div>
      {sunriseTime && sunsetTime ? (
        <div>
          {/* Show Sunrise in large text if it's before sunrise, otherwise show it in normal size */}
          {!isAfterSunset && isBeforeSunrise && (
            <>
              <p style={{ fontSize: '1em' }}>
                <strong>Sunset:</strong> {sunsetTime}
              </p>
              <p style={{ fontSize: isBeforeSunrise ? '1.5em' : '1em' }}>
                <strong>Sunrise:</strong> {sunriseTime}
              </p>
            </>
          )}

          {/* Show Sunset in large text if it's after sunrise but before sunset, otherwise show it in normal size */}
          {!isAfterSunset && isAfterSunriseBeforeSunset && (
            <> 
              <p style={{ fontSize: '1em' }}>
                <strong>Sunrise:</strong> {sunriseTime}
              </p>
              <p style={{ fontSize: isAfterSunriseBeforeSunset ? '1.5em' : '1em' }}>
                <strong>Sunset:</strong> {sunsetTime}
              </p>
            </>
          )}

          {/* Show both in normal size if it's after sunset */}
          {isAfterSunset && (
            <div>
              <p style={{ fontSize: '1em' }}>
                <strong>Sunrise:</strong> {sunriseTime}
              </p>
              <p style={{ fontSize: '1em' }}>
                <strong>Sunset:</strong> {sunsetTime}
              </p>
            </div>
          )}

          {/* Display UVI */}
          <p><strong>UVI:</strong> {uvi}</p>
          <img src='./sunrise.png' alt="Sunrise" />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Sun;
