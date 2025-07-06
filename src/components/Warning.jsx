import React, { useState } from 'react';
import icon from "./information-2.png"

function Warning() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleClick = () => {
    setShowModal(true); // Show the modal on image click
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false); // Close the modal only if the overlay itself was clicked
    }}

  return (
    <div className='warning-box'>
        <h3>Severe Warning Alert</h3>
      <img onClick={handleClick} src={icon} alt="info icon" width="25px" height="25px" className='wb-img'/> 
      
      {showModal && (
        <div className='overlay-w' onClick={handleOverlayClick}>
          <div className='modal'>
            <div className='Content-title'>
                <button onClick={closeModal} className='closeButton' >X</button>
                <h4 className='modal-box'>Severe Warning Alert</h4>
            </div>
            <p className='Content-w'>Severe high wind alerts warning. These conditions start <br></br>at 11:00 (GMT) on Thursday 13th March</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Warning;