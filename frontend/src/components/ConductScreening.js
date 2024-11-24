import React from "react";

const ConductScreening = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        color: 'black', // Ensure text color is black for readability
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center', // Center content horizontally
      }}
    >
      <h2 style={{ color: 'black', marginBottom: '20px' }}>Start Screening</h2>

      <p>Start the screening process for the selected student here.</p>
    </div>
  );
};

export default ConductScreening;
