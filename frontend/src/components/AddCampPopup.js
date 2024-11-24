import React from 'react';
import './AddCampPopup.css';

const AddCampPopup = ({ date, camps, onClose, onAddCamp }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Camps on {date.toDateString()}</h2>
        {camps.length > 0 ? (
          <ul>
            {camps.map((camp, index) => (
              <li key={index}>
                <strong>School:</strong> {camp.schoolName} <br />
                <strong>Location:</strong> {camp.location} <br />
                <strong>Volunteer:</strong> {camp.volunteer} <br />
                <strong>Doctor:</strong> {camp.doctor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No camps scheduled for this day.</p>
        )}
        <div className="popup-buttons">
          <button className="add-button" onClick={onAddCamp}>Add Camp</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddCampPopup;
