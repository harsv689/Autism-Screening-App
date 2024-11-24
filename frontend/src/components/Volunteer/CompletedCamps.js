import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompletedCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const { camps } = location.state || { camps: [] };

  // Filter camps based on volunteer's involvement, search term, and date range
  const filterCamps = () => {
    let filtered = camps.filter(
      (camp) =>
        (camp.volunteer === user_name || camp.doctor === user_name) && 
        camp.status === "completed" || camp.status === "meeting_scheduled" || camp.status === "followup_completed" && // Ensure the camp is completed
        (camp.campID.includes(searchTerm) ||
          camp.schoolName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
    // If From Date is selected, filter by startDate
    if (filters.startDate) {
      filtered = filtered.filter(
        (camp) => new Date(camp.dateTime) >= new Date(filters.startDate)
      );
    }
  
    // If To Date is selected, filter by endDate
    if (filters.endDate) {
      filtered = filtered.filter(
        (camp) => new Date(camp.dateTime) <= new Date(filters.endDate)
      );
    }
  
    setFilteredCamps(filtered);
  };

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details-completed`);
  };

  const handleClearDates = () => {
    setFilters({
      startDate: '',
      endDate: '',
    });
  };

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps, searchTerm, filters]);

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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <i className="fa fa-user-circle" style={{ marginRight: '10px', fontSize: '24px' }}></i>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Volunteer</span>
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

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Completed Camps</h2>

        {/* Search Bar and Date Range Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Camp ID or School Name"
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

          {/* From Date Filter */}
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            style={{
              padding: '10px',
              marginLeft: '15px',
              width: '120px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />

          {/* To Date Filter */}
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            style={{
              padding: '10px',
              marginLeft: '15px',
              width: '120px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />

          {/* Clear Dates Button */}
          <button
            onClick={handleClearDates}
            style={{
              padding: '10px 20px',
              marginLeft: '15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Dates
          </button>
        </div>

        {/* Table */}
        <div style={{ textAlign: 'center' }}>
          {filteredCamps.length > 0 ? (
            <table
              className="camps-table"
              style={{
                color: 'black',
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <th>Camp ID</th>
                  <th>School Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Students Registered</th>
                  <th>+ve Result after screening</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCamps.map((camp) => (
                  <tr
                    key={camp.campID}
                    style={{
                      backgroundColor: '#f9f9fc',
                      color: 'black',
                    }}
                    onClick={() => handleRowClick(camp.campID)}
                  >
                    <td>{camp.campID}</td>
                    <td>{camp.schoolName}</td>
                    <td>{camp.location}</td>
                    <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                    <td>{camp.studentsRegistered}</td>
                    <td>{camp.studentsPositive}</td>
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
                        onClick={() => handleRowClick(camp.campID)}
                      >
                        Go to Camp
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'black' }}>No completed camps available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedCamps;
