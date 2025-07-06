import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

const Map = forwardRef((props, ref) => {
  const windyAPIRef = useRef(null);

  useImperativeHandle(ref, () => ({
    flyToLocation: (lat, lon) => {
      if (windyAPIRef.current?.map) {
        windyAPIRef.current.map.setView([lat, lon], 11); 
        console.log(`📍 Flying to ${lat}, ${lon} at zoom 11`);
      }
    },
  }));

  useEffect(() => {
    const waitForWindy = () => {
      if (!window.windyInit || !window.L) {
        console.log('⏳ Waiting for Windy and Leaflet...');
        return setTimeout(waitForWindy, 300);
      }

      console.log('🚀 Windy and Leaflet are ready');

      const options = {
        key: 'NH24fjjZBwVhOtmbQL1y9CV1lwKcfXla',
        lat: 51.5,
        lon: 0.7,
        zoom: 6,
        overlay: 'wind',
      };

      window.windyInit(options, (windyAPI) => {
        const { map, store } = windyAPI;
        windyAPIRef.current = windyAPI;
        console.log('✅ Windy map initialized');
      });
    };

    waitForWindy();
  }, []);

  return (
    <div
      id="windy"
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
      }}
    />
  );
});

export default Map;
