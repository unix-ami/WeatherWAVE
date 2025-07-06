import React from 'react';

const Wind = ({ windSpeed, windDirection }) => {

  // Wind speed tests
  //windSpeed = 120
  //windSpeed = 89.5

  // Function to get Beaufort scale category
  const getBeaufortCategory = (speed) => {
    if (speed < 1) return 0;
    if (speed >= 1 && speed < 6) return 1;
    if (speed >= 6 && speed < 12) return 2;
    if (speed >= 12 && speed < 20) return 3;
    if (speed >= 20 && speed < 29) return 4;
    if (speed >= 29 && speed < 39) return 5;
    if (speed >= 39 && speed < 50) return 6;
    if (speed >= 50 && speed < 62) return 7;
    if (speed >= 62 && speed < 75) return 8;
    if (speed >= 75 && speed < 89) return 9;
    if (speed >= 89 && speed < 103) return 10;
    if (speed >= 103 && speed < 118) return 11;
    if (speed >= 118) return 12; // Hurricane
    return 0; // Default value
  };

  const getWindCategory = (beaufortCategory) => {
    switch (beaufortCategory) {
      case 0:
        return 'Calm';
      case 1:
        return 'Light Air';
      case 2:
        return 'Light Breeze';
      case 3:
        return 'Gentle Breeze';
      case 4:
        return 'Moderate Breeze';
      case 5:
        return 'Fresh Breeze';
      case 6:
        return 'Strong Breeze';
      case 7:
        return 'Near Gale';
      case 8:
        return 'Gale';
      case 9:
        return 'Strong Gale';
      case 10:
        return 'Storm';
      case 11:
        return 'Violent Storm';
      case 12:
        return 'Hurricane';
      default:
        return 'Unknown';  // For unhandled cases or values outside 0-12
    }
  };

  // Color mapping based on Beaufort category
  const getColor = (category) => {
    switch (category) {
        case 0:
            return 'transparent'; // No color 
        case 1:
            return '#D3D3D3'; // Grey (Light Air)
        case 2:
            return '#ADD8E6'; // Light Blue (Light Breeze)
        case 3:
            return '#87CEEB'; // Sky Blue (Gentle Breeze)
        case 4:
            return '#90EE90'; // Light Green (Moderate Breeze)
        case 5:
            return '#32CD32'; // Green / Lime (Fresh Breeze)
        case 6:
            return '#FFFF00'; // Yellow (Strong Breeze)
        case 7:
            return '#FFA500'; // Orange (Near Gale)
        case 8:
            return '#FF8C00'; // Dark Orange (Gale)
        case 9:
            return '#FF4500'; // Red Orange (Strong Gale)
        case 10:
            return '#B22222'; // Dark Red (Storm)
        case 11:
            return '#8B0000'; // Dark Red (Violent Storm)
        case 12:
            return '#800000'; // Dark Red / Purple (Hurricane)
        default:
            return '#87CEEB'; // Default Light Blue (Light Breeze) for unhandled cases
    }
  };

  const calculateProgress = (speed) => {
    return Math.min((speed / 120) * 100, 100); // Scale to 100% for wind speeds up to 120 m/s
  };

  const beaufortCategory = getBeaufortCategory(windSpeed);
  const progressWidth = calculateProgress(windSpeed); // Calculate the progress width based on wind speed
  const color = getColor(beaufortCategory); // Get color based on Beaufort category
  const category = getWindCategory(beaufortCategory)
  
  // debugging logs
  // console.log("category: ", beaufortCategory)
  // console.log("speed", windSpeed)
  // console.log("width", progressWidth)

  return (
    <div>
      {/* Display Wind Speed */}
      <p>Speed: {windSpeed} m/s</p>
      {/* Display Beaufort Category */}
      <p>Beaufort Category: {beaufortCategory}</p> 
      <p> {category} </p>
      {/* Progress bar to visualize wind speed */}
      <div
        style={{
          width: '100%',
          height: '20px', // Adjust the height of the progress bar
          backgroundColor: '#fff', // White background
          borderRadius: '5px',
          border: '1px solid #ccc', // Border around the gauge
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`, // Set the width based on wind speed (scaled to 100%)
            height: '100%',
            backgroundColor: color, // Set color based on Beaufort category
            borderRadius: '5px',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Display Wind Direction */}
        <p>Wind Direction: {windDirection}°</p>
        <div
        style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            position: 'relative',
            margin: '0 auto',
        }}
        >
        <div
        style={{
            position: 'absolute',
            top: '20%', // Adjust as needed
            left: '30%', // Adjust as needed
            transform: `rotate(${windDirection}deg)`, // Rotate the image based on wind direction
            transformOrigin: 'center', // Rotate around the center of the image
        }}
        >
        <img
            src="/arrow.png"
            alt="arrow"
            style={{
            width: '20px', // Adjust to the size of your arrow
            height: '20px', // Adjust to the size of your arrow
            }}
        />
        </div>
        </div>
        </div>
    </div>
  );
};

export default Wind;
