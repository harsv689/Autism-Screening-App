import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampDetailsStaff = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const campID = localStorage.getItem('camp-id');

  // Fetch camps data
  const fetchCamps = async () => {
    try {
      const response = await axios.get('/api/auth/camps');
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  // Filter camps by selected camp ID
  const filterCamps = () => {
    const filtered = camps.filter((camp) => camp.campID === campID);
    setFilteredCamps(filtered);
    localStorage.setItem('volunteer', filtered[0]?.volunteer); // Set volunteer info in local storage
    setLoading(false); // Set loading to false after data is filtered
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps]);

  // Handlers for navigation
  const handleHomeClick = () => {
    navigate(`/dashboard`);
  };

  const handleAddStudentClick = () => {
    navigate(`/add-student`);
  };

  const handleViewStudentsClick = () => {
    navigate(`/patients-list`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div style={styles.logoSection}>
          <img src="./Choice_Foundation.png" alt="Choice Foundation Logo" style={styles.logo} />
        </div>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </div>

      <div style={styles.titleSection}>
        <h2 style={styles.pageTitle}>Camp Details</h2>
      </div>

      {/* Button container for actions */}
      <div style={styles.headerButtons}>
        <button style={styles.button} onClick={handleAddStudentClick}>
          Add Student
        </button>
        <button style={styles.button} onClick={handleViewStudentsClick}>
          View Students
        </button>
      </div>

      {/* Display Loading or Camp Data */}
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : filteredCamps.length > 0 ? (
        <div style={styles.outerBox}>
          {filteredCamps.map((camp) => (
            <div key={camp.campID} style={styles.innerBox}>
              <div style={styles.section}>
                <div style={styles.grid}>
                  <div style={styles.gridItem}>
                    <strong>Camp ID:</strong> {camp.campID}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>School Name:</strong> {camp.schoolName}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Location:</strong> {camp.location}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Contact:</strong> {camp.contact}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Doctor Assigned:</strong> {camp.doctor}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Status:</strong> {camp.status}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Date of Screening:</strong>{' '}
                    {new Date(camp.dateTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div style={styles.section}>
                <h3 style={styles.subSectionTitle}>Statistics</h3>
                <div style={styles.statisticsGrid}>
                  <div style={styles.gridItem}>
                    <strong>Pre-Screened:</strong> {camp.studentsScreened || 'N/A'}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>To Be Diagnosed:</strong> {camp.studentsPositive || 'N/A'}
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Scheduled for Diagnosis:</strong> 14
                  </div>
                  <div style={styles.gridItem}>
                    <strong>Tested Positive:</strong> 5
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.errorText}>Camp Not Found</p>
      )}
    </div>
  );
};

// Styles for the page
const styles = {
  container: {
    background: `radial-gradient(circle, #eef2f6 0%, #f6e3eb 48%, #d5deed 93%), linear-gradient(to bottom, #d8d2fc, #fde2e0, #e6e4ea, #e0e9f4, #e6e1e8, #e0e9f4)`,
    minHeight: '100vh',
    fontFamily: '"Poppins", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  headerSection: {
    width: '90%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    maxHeight: '80px',
    width: 'auto',
    objectFit: 'contain',
  },
  homeButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  titleSection: {
    width: '90%',
    maxWidth: '1200px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  headerButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#007bff',
    marginTop: '20px',
  },
  outerBox: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '1200px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '40px',
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  section: {
    backgroundColor: '#f5f7fa',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    color: '#000',
  },
  subSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#000',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    color: '#000',
  },
  statisticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    color: '#000',
  },
  gridItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#000',
  },
  errorText: {
    fontSize: '18px',
    color: 'red',
    marginTop: '20px',
  },
};

export default CampDetailsStaff;
