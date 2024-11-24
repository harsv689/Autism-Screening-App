import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Profilepic from './Choice_logo.png';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '', // Add phone field
    gender: '', // Add gender field
    address: '', // Add address field
    qualifications: '',
    pastExperiences: '' // Add pastExperiences field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  // Get user info from localStorage
  const userName = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let url = `/api/auth/profiledata/${userName}`;
        if (role === 'Doctor') {
          url = `/api/auth/profiledatad/${userName}`;
        } else if (role === 'Volunteer') {
          url = `/api/auth/profiledatav/${userName}`;
        }

        const response = await axios.get(url);
        const userData = response.data.document;
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || '',
          phoneNumber: userData.phoneNumber || '',
          gender: userData.gender || '',
          address: userData.address || '',
          qualifications: userData.qualifications || '',
          pastExperiences: userData.pastExperiences || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userName, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUpdateMessage('');

    try {
      let url = `/api/auth/updateprofile/${userName}`;
      const updateData = { name: formData.name, email: formData.email };

      if (role === 'Doctor' || role === 'Volunteer') {
        // Add Doctor/Volunteer specific fields
        updateData.phoneNumber = formData.phoneNumber;
        updateData.gender = formData.gender;
        updateData.address = formData.address;
        updateData.qualifications = formData.qualifications;
        updateData.pastExperiences = formData.pastExperiences;
        url = role === 'Doctor' ? `/api/auth/updateprofiled/${userName}` : `/api/auth/updateprofilev/${userName}`;
      }
      console.log("hi")
      console.log(updateData)
      const response = await axios.put(url, updateData);
      console.log(response)
      if (response.data.success) {
        setUpdateMessage('Profile updated successfully!');
        // Update localStorage if name has changed
        if (formData.name !== userName) {
          localStorage.setItem('name', formData.name);
        }
        // Navigate back to profile page after 2 seconds
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="edit-profile-card">
        <img src={Profilepic} alt="Profile" className="profile-image" />
        <h2>Edit Profile Information</h2>

        {error && <div className="error-message">{error}</div>}
        {updateMessage && <div className="success-message">{updateMessage}</div>}

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          {(role !== 'Doctor' && role !== 'Volunteer')&&(

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          )}

          {/* Conditionally render additional fields based on the role */}
          {(role === 'Doctor' || role === 'Volunteer') && (
            <>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="qualifications">Qualifications</label>
                <input
                  type="text"
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  placeholder="Enter your qualifications"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Enter your gender"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pastExperiences">Past Experiences</label>
                <textarea
                  id="pastExperiences"
                  name="pastExperiences"
                  value={formData.pastExperiences}
                  onChange={handleChange}
                  placeholder="Enter your past experiences"
                  style={{width:'400px'}}
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
