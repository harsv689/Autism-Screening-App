import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ScheduleCamp = () => {
  const navigate = useNavigate();
  const [camp, setCamp] = useState({
    schoolName: '',
    location: '',
    dateTime: '',
    volunteer: '',
    doctor: '',
    contact: '',
    furtherDetails: '',
  });

  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch all users and filter by role
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/users');
        setUsers(response.data);
        console.log(response.data);
        setVolunteers(response.data.filter(user => user.role === 'Volunteer'));
        setDoctors(response.data.filter(user => user.role === 'Doctor'));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setCamp({ ...camp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/scheduleCamp', camp);
      alert('Camp scheduled successfully');
      navigate('/dashboard'); // Redirect to dashboard after successful submission
    } catch (error) {
      alert('Error scheduling camp');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Schedule New Camp</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>School Name</label>
            <input type="text" name="schoolName" placeholder="👥 Enter school name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" placeholder="📍 Enter location" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" name="dateTime" onChange={handleChange} required />
          </div>

          {/* Volunteer Dropdown */}
          <div className="form-group">
            <label>Volunteer</label>
            <select name="volunteer" onChange={handleChange} required>
              <option value="">Select Volunteer</option>
              {volunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.name}>
                  {volunteer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Dropdown */}
          <div className="form-group">
            <label>Doctor</label>
            <select name="doctor" onChange={handleChange} required>
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input type="tel" name="contact" placeholder="👤 Enter contact number" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Further Details</label>
            <textarea name="furtherDetails" placeholder="✏️ Enter further details" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Schedule</button>
        </form>
      </div>

    </div>
  );
};

export default ScheduleCamp;
