import React, { useState } from 'react';
import '../styles/Fish.css'; // Import the modal CSS file

const FishingConditions = ({ minTemp, maxTemp, tempUnit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const fishTypes = [
    { name: "Trout", minTemp: 5, maxTemp: 18 },
    { name: "Bass", minTemp: 15, maxTemp: 25 },
    { name: "Walleye", minTemp: 7, maxTemp: 20 },
    { name: "Salmon", minTemp: 8, maxTemp: 14 },
    { name: "Catfish", minTemp: 20, maxTemp: 30 },
    { name: "Pike", minTemp: 5, maxTemp: 15 },
    { name: "Perch", minTemp: 5, maxTemp: 20 },
    { name: "Carp", minTemp: 15, maxTemp: 25 },
  ];

  const getFishingAdvice = (minTemp, maxTemp) => {
    if (maxTemp < 10) {
      return "Cold water, fish are likely deeper. Fishing is tougher, but larger fish may be found.";
    } else if (maxTemp >= 10 && maxTemp <= 20) {
      return "Cool water, good conditions for fishing. Fish are often closer to shore.";
    } else if (maxTemp > 20 && maxTemp <= 30) {
      return "Warm water, ideal for fishing. Fish are active and may be found near shallow waters.";
    } else {
      return "Hot water, fish may be less active. Try fishing in cooler, deeper waters.";
    }
  };

  const getFishByTemperature = (minTemp, maxTemp) => {
    return fishTypes.filter(fish => 
      (fish.minTemp <= maxTemp && fish.maxTemp >= minTemp)
    ).map(fish => fish.name);
  };

  const fishingAdvice = getFishingAdvice(minTemp, maxTemp);
  const fishList = getFishByTemperature(minTemp, maxTemp);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h4>Fishing Conditions</h4>
      <div className="box block">
        <div>
          <p>Min temp: {minTemp}°{tempUnit}</p>
          <p>Max temp: {maxTemp}°{tempUnit}</p>
        </div>
        <div>
          <p>{fishingAdvice}</p>
        </div>
        {fishList.length > 0 && (
          <div>
            <button onClick={openModal}>
              <span>See Fish Species</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal for Fish Species */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h5>Fish Species Likely to Be Found:</h5>
            <ul>
              {fishList.map((fish, index) => (
                <li key={index}>{fish}</li>
              ))}
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FishingConditions;
