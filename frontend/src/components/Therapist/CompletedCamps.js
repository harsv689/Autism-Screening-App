import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AllPatients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { camps } = location.state || { camps: [] };

  // State to store filtered camps and search query
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState(camps);

  // Function to filter camps based on search query (by Camp ID, School Name, or Location)
  const filterCamps = () => {
    if (!searchQuery) {
      setFilteredCamps(camps); // If no search query, show all camps
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = camps.filter(
        (camp) =>
          camp.campID.toString().toLowerCase().includes(lowercasedQuery) ||
          camp.schoolName.toLowerCase().includes(lowercasedQuery) ||
          camp.location.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCamps(filtered);
    }
  };

  // Run the filter whenever the search query changes
  useEffect(() => {
    filterCamps();
  }, [searchQuery, camps]);

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details-staff`);
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
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Therapist</span>
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
        </header>

        <h2 style={{ color: 'black', marginBottom: '20px' }}>All Patients</h2>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Camp ID, School Name, or Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
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
                    <td>{camp.volunteer}</td>
                    <td>{camp.doctor}</td>
                    <td>{camp.studentsRegistered}</td>
                    <td>{camp.studentsPositive}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: '#007bff', // Blue background
                          color: 'white',
                          border: 'none',
                          padding: '10px 30px', // Padding to make the button wider
                          cursor: 'pointer',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap', // Ensures the text stays on a single line
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

export default AllPatients;
