import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompletedMeetings = () => {
  const navigate = useNavigate();
  const user_name = localStorage.getItem('name');
  const [camps, setCamps] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [meetings, setMeetings] = useState([]);
  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('/api/auth/meetings');
      const doctorMeetings = response.data.filter(meeting => meeting.doctor === user_name);
      setMeetings(doctorMeetings); 
      const response2 = await axios.get('/api/auth/camps');
      setCamps(response2.data); 
      console.log(doctorMeetings);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };
  
  // Fetch camps when the component mounts
  useEffect(() => {
    fetchMeetings();
  }, [user_name]);

  const filterMeetings = () => {
    let filtered = meetings.filter(
      (meeting) =>
        (meeting.doctor === user_name ) && (meeting.status === "scheduled")
    );

    if (filters.startDate) {
      filtered = filtered.filter(
        (meeting) => new Date(meeting.dateTime) >= new Date(filters.startDate)
      );
    }

    // Filter by endDate if selected
    if (filters.endDate) {
      filtered = filtered.filter(
        (meeting) => new Date(meeting.dateTime) <= new Date(filters.endDate)
      );
    }

    setFilteredMeetings(filtered);
  };

  const handleRowClick = (meetingID) => {
    localStorage.setItem('meet-id', meetingID);
    navigate(`/meeting-details`);
  };

  const handleClearDates = () => {
    setFilters({
      startDate: '',
      endDate: '',
    });
  };

  useEffect(() => {
    if (meetings.length > 0) {
      filterMeetings();
    }
  }, [meetings, filters]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
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
          }}>Doctor</span>
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

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Scheduled Meetings</h2>

        {/* Search Bar and Date Range Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Meeting ID or Topic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              maxWidth: '300px',
            }}
          />

          {/* Date Filters
          <div style={{ marginLeft: '20px', display: 'flex', gap: '20px' }}>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              onClick={handleClearDates}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear Dates
            </button>
          </div> */}
        </div>

        {/* Table */}
        <div style={{ textAlign: 'center' }}>
          {filteredMeetings.length > 0 ? (
            <table
              className="meetings-table"
              style={{
                color: 'black',
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <th>Meeting ID</th>
                  <th>Camp Id</th>
                  <th>DateTime</th>
                  <th>Total Students to be Examined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeetings.map((meeting) => {
                  // Find the camp corresponding to the current meeting's campID
                  const camp = camps.find((c) => c.campID === meeting.campID);

                  return (
                    <tr
                      key={meeting.meetID}
                      style={{
                        backgroundColor: '#f9f9fc',
                        color: 'black',
                      }}
                      onClick={() => handleRowClick(meeting.meetID)}
                    >
                      <td>{meeting.meetID}</td>
                      <td>{meeting.campID}</td>
                      <td>{new Date(meeting.dateTime).toLocaleDateString()}</td>
                      <td>{camp ? camp.studentsScreenedPositive : 'N/A'}</td>
                      <td>
                        <button
                          style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '10px 30px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                          }}
                          onClick={() => handleRowClick(meeting.meetID)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'black' }}>No meetings Scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedMeetings;
