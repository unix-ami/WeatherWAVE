import React, { useEffect, useRef, useState } from 'react';

function Compass() {
  const compassRef = useRef(null);
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha;
      if (alpha !== null) {
        setHeading(Math.round(alpha));
        if (compassRef.current) {
          compassRef.current.style.transform = `rotate(${alpha}deg)`;
        }
      }
    };

    // Request permission on iOS
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div
        ref={compassRef}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '6px solid #333',
          margin: '0 auto',
          position: 'relative',
          background: '#fff',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '50px',
            backgroundColor: 'red',
            position: 'absolute',
            top: '5px',
            left: 'calc(50% - 2px)',
          }}
        />
      </div>
      {heading !== null && <p>Heading: {heading}°</p>}
    </div>
  );
}

export default Compass; 
