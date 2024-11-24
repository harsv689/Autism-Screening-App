import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const studentID = localStorage.getItem("student-id");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredScreenings, setFilteredScreenings] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/auth/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchScreenings = async () => {
      try {
        const response = await axios.get("/api/auth/screenings");
        setScreenings(response.data);
        console.log("SCREENING: ", response.data);
      } catch (error) {
        console.error("Error fetching screenings:", error);
      }
    };

    fetchStudents();
    fetchScreenings();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const filtered = students.filter((student) => student.studentId === studentID);
      setFilteredStudents(filtered);
    }
  }, [students]);

  useEffect(() => {
    if (screenings.length > 0) {
      const filtered = screenings.filter((screening) => screening.studentId === studentID);
      setFilteredScreenings(filtered);
    }
  }, [screenings]);

  const handleHomeClick = () => {
    navigate(`/dashboard`);
  };

  const handleConductScreening = () => {
    navigate(`/conduct-screening`);
  };

  const handleViewReport = (screeningId) => {
    localStorage.setItem('screening-id', screeningId);
    navigate(`/reportview`);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.logoSection}>
          <img
            src="./Choice_Foundation.png" // Replace with the Choice Foundation logo URL
            alt="Choice Foundation Logo"
            style={styles.logo}
          />
        </div>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </div>

      {/* Title Section */}
      <div style={styles.titleSection}>
        <h1 style={styles.pageTitle}>Student Details</h1>
      </div>

      {/* Outer Container */}
      <div style={styles.outerBox}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Student Information</h2>
          <div style={styles.headerButtons}>
            {/* <button style={styles.button} onClick={handleViewStudentsClick}>
              View Students
            </button> */}
            <button style={styles.button} onClick={handleConductScreening}>
              Conduct Screening
            </button>
          </div>
        </div>

        {/* Inner Box */}
        <div style={styles.innerBox}>
          {/* Student Information Section */}
        <div style={styles.section}>
          <div style={styles.grid}>
            {/* {filteredStudents.map((student, index) => ( */}
              {/* <div key={index} style={styles.gridItemContainer}> */}
                <div style={styles.gridItem}>
                  <strong>Student ID:</strong> {filteredStudents[0]?.studentId}
                </div>
                <div style={styles.gridItem}>
                  <strong>Name:</strong> {filteredStudents[0]?.name}
                </div>
                <div style={styles.gridItem}>
                  <strong>Address:</strong> {filteredStudents[0]?.address}
                </div>
                <div style={styles.gridItem}>
                  <strong>Gender:</strong> {filteredStudents[0]?.gender}
                </div>
                <div style={styles.gridItem}>
                  <strong>Phone:</strong> {filteredStudents[0]?.phoneNumber}
                </div>
                <div style={styles.gridItem}>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(filteredStudents[0]?.dateTime).toLocaleDateString()}
                </div>
            {/* ))} */}
          </div>
        </div>

          {/* Screening History Section */}
        <div style={styles.screeningHistoryBox}>
          <div style={styles.sectionTitle}>Screening History</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Screening ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Volunteer</th>
                <th>Diagnosis</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
  {filteredScreenings.length > 0 ? (
    filteredScreenings.map((screening, index) => (
      <tr key={index} style={styles.tableRow}>
        <td style={styles.tableCell}>{screening.screeningId}</td>
        <td style={styles.tableCell}>{new Date(screening.date).toLocaleDateString()}</td>
        <td style={styles.tableCell}>{new Date(screening.date).toLocaleTimeString()}</td>
        <td style={styles.tableCell}>{screening.volunteerName}</td>
        <td style={styles.tableCell}>{screening.diagnosis}</td>
        <td style={styles.tableCell}>
          <button
            onClick={() => handleViewReport(screening.screeningId)}
            style={styles.viewButton}
          >
            View Report
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr style={styles.tableRow}>
      <td colSpan="6" style={styles.tableCell}>
        No Screening History
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: `radial-gradient(circle, #eef2f6 0%, #f6e3eb 48%, #d5deed 93%), 
                 linear-gradient(to bottom, #d8d2fc, #fde2e0, #e6e4ea, #e0e9f4, #e6e1e8, #e0e9f4)`,
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
    maxHeight: '80px', // Adjust this value to control the maximum height
    width: 'auto', // Maintain aspect ratio
    objectFit: 'contain', // Ensures the logo is not distorted
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
  outerBox: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '1200px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerButtons: {
    display: 'flex',
    gap: '10px',
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
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
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
    gap: '10px',
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
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed", // Ensures consistent column widths
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    color: "#000",
    textAlign: "center", // Align headers to the center
    fontWeight: "bold",
    borderBottom: "2px solid #dee2e6",
    padding: "10px",
  },
  tableRow: {
    borderBottom: "1px solid #dee2e6",
  },
  tableCell: {
    padding: "10px",
    fontSize: "14px",
    textAlign: "center", // Align cell contents to the center
    wordWrap: "break-word", // Handles long text gracefully
  },
  screeningHistoryBox: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    overflowX: "auto", // Horizontal scroll for smaller screens
  },
  viewButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default StudentDetails;