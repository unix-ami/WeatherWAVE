import React, { useState, useEffect } from 'react';
import '../styles/index.css';
import Theme from './Theme';
import cog from '../assets/settings.png'; 
import Logo from "./Logo";

const Settings = ({city, handleInputChange, handleSubmit, temperatureUnit, setTemperatureUnit, offlineMode, setOfflineMode}) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    // Function to toggle between Celsius and Fahrenheit
    const toggleUnit = () => {
        setTemperatureUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
    };

    useEffect(() => {
        const topElement = document.querySelector('.main');
        const containerElement = document.querySelector('.container');
        const Logo_Img = document.querySelector('.Logo-position');
        const clock_bg = document.querySelector('.clock-bg');
        const app_title = document.querySelector('.title');

        if (isOpen) {
            if (topElement) topElement.classList.add('blur'); 
            if (containerElement) containerElement.classList.add('blur');
            if (Logo_Img) Logo_Img.classList.add('blur');
            if (clock_bg) clock_bg.classList.add('blur');
            if (app_title) app_title.classList.add('visibility');
            

        } else {
            if (topElement) topElement.classList.remove('blur'); 
            if (containerElement) containerElement.classList.remove('blur'); 
            if (Logo_Img) Logo_Img.classList.remove('blur'); 
            if (clock_bg) clock_bg.classList.remove('blur');
            if (app_title) app_title.classList.remove('visibility');

        }
    }, [isOpen]);

    return (
        <> 
        <Logo></Logo>
        <div className='title'> 
            <p className='title'> WeatherWAVE</p>
        </div>
        <div className="settings-container">
            <button id="settingsButton" onClick={togglePanel}>
              <img src={cog} alt="settings cog" />
            </button>

            <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
                <div className='settingsTitle'> 
                    <h2>Settings</h2>
                    <p className="settings-subtitle">Adjust your preferences here.</p>
                </div>

                {/* Theme selector */}
                <div className="settings-feature">
                <h3>Color Scheme </h3>
                    <Theme />
                </div>
                
                {/* Location input */}
                <div className="settings-feature">
                    <form onSubmit={handleSubmit}>
                        <h3>Set Location</h3>
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={handleInputChange}
                        />
                        <button className="search" type="submit">Get Weather</button>
                    </form>
                </div>
                
                {/* Changing units button */}
                <div class="settings-feature temp-toggle"> {/* Unnessecary class added so other code isnt affected */}
                    <h3>Tempreture Unit</h3>
                    <p>Current Unit: {temperatureUnit === 'C' ? 'Celsius' : 'Fahrenheit'}</p>
                    <button onClick={toggleUnit}>
                        {temperatureUnit === 'C' ? 'Fahrenheit °F' : 'Celsius °C'}
                    </button>
                </div>
                
                {/* offline mode */}
                <div>
                    <h3>Sailing Mode:</h3>
                    <p>prevents hourly refresh when offline</p>
                    <button className='offline' onClick={() => setOfflineMode(!offlineMode)}>
                        <p> {offlineMode ? "Currently Offline, Go Online" : "Currently Online, Go Offline"} </p>
                    </button>
                </div>
            <div>        
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "250px" }}>
        </div>

        </div>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={togglePanel}></div>
        </div>
        </>
    );
};

export default Settings;