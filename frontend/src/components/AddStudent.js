import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [Volunteer, setVolunteer] = useState('');
  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    dateTime: '',
    gender: '',
    phoneNumber: '',
    address: '',
    volunteer: '',
    pastHistory: '',
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/addStudent', student);
      navigate('/patients-list');
    } catch (error) {
      alert('Error adding student');
    }
  };

  useEffect(() => {
    const volunteerName = localStorage.getItem('name');
    const campID = localStorage.getItem('camp-id'); 
    console.log(volunteerName);
    setVolunteer(volunteerName);
    setStudent((prevStudent) => ({
      ...prevStudent,
      volunteer: volunteerName,
      campId: campID,
    }));
  }, []);

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Add New Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID</label>
            <input type="text" name="studentId" placeholder="👤 Enter Student ID" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="✏️ Enter Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" name="dateTime" placeholder="📅" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="📞 Enter Phone Number" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" placeholder="🏠 Enter Address" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Past History</label>
            <textarea name="pastHistory" placeholder="📂 Enter Past History" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;