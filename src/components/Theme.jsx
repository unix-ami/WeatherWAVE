import React, { useState, useEffect } from 'react';
import '../styles/index.css'; 
import sunIcon from '../assets/sun.png'; 
import moonIcon from '../assets/moon.png'; 

const Theme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
      setIsDarkTheme(prevTheme => !prevTheme);
  };

  // Effect to update the body class based on the theme
  useEffect(() => {
      document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <div className="theme-box"> 
      <p>The current theme is {isDarkTheme ? "Dark" : "Light"}</p>
      <div className="theme">
        <button className="toggle" onClick={toggleTheme} aria-label="toggle theme">
          <img src={isDarkTheme ? sunIcon : moonIcon} alt="toggle theme icon" />
          <p> toggle theme </p> 
        </button>
      </div>
    </div>
  );
};

export default Theme;