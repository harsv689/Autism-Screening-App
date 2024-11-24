import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CampsInProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 5; // Number of items per page
  const { camps } = location.state || { camps: [] };

  // Filter camps based on the user, search term, and date range
  const filterCamps = () => {
    const filtered = camps.filter((camp) => {
      const campStartDate = new Date(camp.startDate); // Assuming each camp has a startDate field
      const campEndDate = new Date(camp.endDate); // Assuming each camp has an endDate field
      const campDate = new Date(camp.dateTime); // The camp date for checking "upcoming"

      const inProgress = camp.status === "inprogress";
      const isUpcoming = camp.status === "upcoming" && campDate <= new Date(); // Check if camp is upcoming and the date is today or before

      const isWithinDateRange =
        (!startDate || campStartDate >= new Date(startDate)) &&
        (!endDate || campEndDate <= new Date(endDate));

      return (
        camp.volunteer === user_name &&
        (inProgress || isUpcoming) && // Filter by either "inprogress" or "upcoming"
        (!searchTerm ||
          camp.campID.includes(searchTerm) ||
          camp.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          camp.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        isWithinDateRange
      );
    });

    setFilteredCamps(filtered);
  };


  // Function to trigger the POST request if camp status is 'upcoming' and date is today
  const updateCampInProgress = async (campID) => {
    const today = new Date();
    const campDate = new Date(camps.find(camp => camp.campID === campID)?.dateTime);
    console.log(campDate.toDateString());
    console.log(today.toDateString());
    // Check if the camp date is today
    if (campDate.toDateString() <= today.toDateString()) {
      try {
        const response = await axios.post('/api/auth/updateCampInProgress', {
          campID: campID
        });
        console.log('Camp status updated successfully');
      } catch (error) {
        console.error('Error updating camp status:', error);
      }
    }
  };

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps, searchTerm, startDate, endDate]);

  useEffect(() => {
    // Loop through the filtered camps and trigger the update for those scheduled for today
    filteredCamps.forEach((camp) => {
      if (camp.status === 'upcoming') {
        updateCampInProgress(camp.campID);
      }
    });
  }, [filteredCamps]); // Trigger when filteredCamps is updated

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

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

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Camps In Progress</h2>

        {/* Search and Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            width: '60%',
          }}
        >
          <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by camp ID, school name, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                flex: 2,
                marginRight: '10px',
              }}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginRight: '10px',
              }}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginRight: '10px',
              }}
            />
            <button
              onClick={handleClearFilters}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Display No camps message if filteredCamps is empty */}
        {filteredCamps.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}>
            <p>No camp scheduled for today.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <table
              style={{
                width: '80%',
                borderCollapse: 'collapse',
                marginBottom: '20px',
                textAlign: 'center',
                justifySelf: 'center'
              }}
            >
              <thead style={{ backgroundColor: '#50ac54' }}>
                <tr style={{ color: 'white', height: 30 }}>
                  <th>Camp ID</th>
                  <th>School Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Students Registered</th>
                  <th>Students Screened</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCamps.map((camp, index) => (
                  <tr
                    key={camp.campID}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f9f9fc' : '#f4f4ff',
                      color: 'black',
                      padding: 25
                    }}
                  >
                    <td>{camp.campID}</td>
                    <td>{camp.schoolName}</td>
                    <td>{camp.location}</td>
                    <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                    <td>{camp.studentsRegistered}</td>
                    <td>{camp.studentsScreened}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '4px',
                          cursor: 'pointer',
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

            {/* Pagination */}
            {/* <div style={{ textAlign: 'center' }}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    backgroundColor: currentPage === index + 1 ? '#007bff' : '#f0f0f0',
                    color: currentPage === index + 1 ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default CampsInProgress;
