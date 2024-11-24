import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StaffUpcomingCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { camps } = location.state || { camps: [] };

  // State to store filtered camps and search query
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredCamps, setFilteredCamps] = useState(camps);

  // Function to filter camps based on search query and date range
  const filterCamps = () => {
    let filtered = camps;

    // Apply search query filter
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (camp) =>
          camp.campID.toString().toLowerCase().includes(lowercasedQuery) ||
          camp.schoolName.toLowerCase().includes(lowercasedQuery) ||
          camp.location.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Apply date range filter
    if (startDate && endDate) {
      filtered = filtered.filter((camp) => {
        const campDate = new Date(camp.dateTime);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return campDate >= start && campDate <= end;
      });
    }

    setFilteredCamps(filtered);
  };

  // Run the filter whenever the search query or date range changes
  useEffect(() => {
    filterCamps();
  }, [searchQuery, startDate, endDate, camps]);

  // Handle row click for navigating to camp details
  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details-staff`);
  };

  // Reset date filters
  const clearDateFilters = () => {
    setStartDate('');
    setEndDate('');
  };

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
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Staff</span>
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
        </header>

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Upcoming Camps</h2>

        {/* Search Bar and Date Filters */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by Camp ID, School Name, or Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: '10px',
              width: '150px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: '10px',
              width: '150px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            onClick={clearDateFilters}
            style={{
              backgroundColor: '#d9534f', // Red background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
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
                  <th>Volunteer</th>
                  <th>Doctor</th>
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
                    <td>{camp.volunteer}</td>
                    <td>{camp.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'black' }}>No upcoming camps scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffUpcomingCamps;
