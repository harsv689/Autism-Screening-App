import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UnscheduledMeetings = () => {
  const navigate = useNavigate();
  const user_name = localStorage.getItem('name');
  const [unscheduledCamps, setUnscheduledCamps] = useState([]);
  const [selectedCampID, setSelectedCampID] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [camps, setCamps] = useState([]);
  const role = localStorage.getItem('role');
 
  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('/api/auth/camps');
      const filtered = response.data.filter(camp => camp.status === "completed");
      setUnscheduledCamps(filtered);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };
  
  // Fetch camps when the component mounts
  useEffect(() => {
    fetchCamps();
  }, [user_name]);
  
  // Update `unscheduledCamps` whenever `camps` changes
  // useEffect(() => {
  //   const filtered = camps.filter((camp) => camp.status === 'completed' && camp.doctor === user_name);
  //   setUnscheduledCamps(filtered);
  // }, [camps]); 
  

  const handleScheduleClick = (camp) => {
    setSelectedCampID(camp.campID);
    setSelectedDoctor(camp.doctor);
    setIsModalOpen(true);
  };

  const handleScheduleMeeting = async () => {
    if (!meetingDate || !meetingTime) {
      alert('Please select both date and time.');
      return;
    }
  
    try {
      const data = {
        campID: selectedCampID,
        status: 'meeting_scheduled',
        meetingDate,
        meetingTime,
        doctor: selectedDoctor,
      };
      await axios.post('/api/auth/scheduleMeeting', data);
      const updatedCamps = unscheduledCamps.map((camp) =>
        camp.campID === selectedCampID
          ? { ...camp, status: 'meeting_scheduled' }
          : camp
      );
  
      setUnscheduledCamps(updatedCamps.filter((camp) => camp.status === 'completed'));
      setIsModalOpen(false);
  
      alert(`Meeting scheduled for Camp ID ${selectedCampID} on ${meetingDate} at ${meetingTime}`);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Error scheduling the meeting. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          background: 'linear-gradient(to bottom, #9F69B8, #4D8BCC)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '30px' 
        }}>
          <i className="fa fa-user-circle" style={{ 
            marginRight: '10px', 
            fontSize: '24px' 
          }}></i>
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: '20px' 
          }}>{role}</span>
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <i className="fa fa-home" style={{ marginRight: '10px' }}></i> Home
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <i className="fa fa-user" style={{ marginRight: '10px' }}></i> Profile
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/support')}
        >
          <i className="fa fa-question-circle" style={{ marginRight: '10px' }}></i> Support
        </div>
        <div
          style={{
            marginTop: 'auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          <i className="fa fa-sign-out-alt" style={{ marginRight: '10px' }}></i> Log Out
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <img src="./Choice_Foundation.png" alt="Company Logo" style={{ height: '40px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fa fa-user-circle"
              style={{ fontSize: '30px', marginRight: '10px' }}
            ></i>
            <span style={{ color: 'black' }}>{user_name}</span>
          </div>
        </header>

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Unscheduled Meetings</h2>

        {/* Table */}
        {unscheduledCamps.length > 0 ? (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: '20px 0',
              backgroundColor: '#fff',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#e9ecef' }}>
                <th>Camp ID</th>
                <th>School Name</th>
                <th>Doctor Assigned</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unscheduledCamps.map((camp) => (
                <tr key={camp.campID} style={{ textAlign: 'center' }}>
                  <td>{camp.campID}</td>
                  <td>{camp.schoolName}</td>
                  <td>{camp.doctor}</td>
                  <td>{camp.location}</td>
                  <td>{camp.status}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: '#4D8BCC',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleScheduleClick(camp)}
                    >
                      Schedule Meeting
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Meetings to Schedule</p>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                textAlign: 'center',
                width: '300px',
              }}
            >
              <h3>Schedule Meeting</h3>
              {/* <p>{`Camp: ${selectedCamp.schoolName}`}</p> */}
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                style={{ display: 'block', margin: '10px auto', width: '80%' }}
              />
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                style={{ display: 'block', margin: '10px auto', width: '80%' }}
              />
              <button
                style={{
                  backgroundColor: '#4D8BCC',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  margin: '10px',
                }}
                onClick={handleScheduleMeeting}
              >
                Schedule
              </button>
              <button
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnscheduledMeetings;
