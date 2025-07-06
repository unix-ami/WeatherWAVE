import React from 'react';

const SwellWarning = ({ swellHeight, onClose }) => {
  return (
    <div
      className="warning-box"
      style={{
        backgroundColor: '#f39c12',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px',
        fontWeight: 'bold',
        position: 'relative'
      }}
    >
      ⚠️ Caution: Swell height is {swellHeight} meters. Small sailboats should proceed with caution.
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '10px',
          top: '5px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: '#fff'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default SwellWarning;
