import React, { useState } from 'react';
import Weather from './Weather';
import './styles/index.css'; 
const App = () => {

  const [temperatureUnit, setTemperatureUnit] = useState('C');

  return (
      <div>
        <Weather temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
      </div>
  );
};

export default App;