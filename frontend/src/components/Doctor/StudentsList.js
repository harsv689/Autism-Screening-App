import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewscreeningsDoctor = () => {
  const navigate = useNavigate();
  const SelectedCamp = localStorage.getItem('camp-id');
  console.log(SelectedCamp)
  const [screenings, setScreenings] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredstudents, setFilteredstudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [statusFilter, setStatusFilter] = useState(''); // Status filter state

  // Fetching screenings and students from the server
  const fetchScreenings = async () => {
    try {
      const response_screenings = await axios.get('/api/auth/screenings');
      const response_students = await axios.get('/api/auth/students');
      setScreenings(response_screenings.data);
      setStudents(response_students.data);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching screenings:', error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Display only the screenings associated with the selected camp and apply the filters
  const filterscreenings = () => {
    let filtered = screenings.filter((screening) => screening.campId === SelectedCamp && screening.diagnosis != "Screened Negative");

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phoneNumber.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    // Now filter students to match the studentId from the filtered screenings
    const filteredStudentIds = filtered.map((screening) => screening.studentId);
    const filteredStudents = students.filter((student) =>
      filteredStudentIds.includes(student.studentId)
    );

    setFilteredstudents(filteredStudents);
  };

  useEffect(() => {
    fetchScreenings();
  }, []);

  useEffect(() => {
    if (screenings.length > 0) {
      filterscreenings();
    }
  }, [screenings, searchTerm, statusFilter]);

  // Handling row click to navigate to student profile
  const handleRowClick = (studentId) => {
    localStorage.setItem('student-id', studentId);
    navigate(`/student-profile-doctor`);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        boxSizing: 'border-box',
        color: 'black',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        <h2>Students List</h2>

        {/* Button container at the top right */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            onClick={() => navigate(`/add-student`)}
            style={{
              backgroundColor: '#007bff', // Blue background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            Add Student
          </button>
          <button
            onClick={() => navigate(`/dashboard`)}
            style={{
              backgroundColor: '#007bff', // Blue background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            Home
          </button>
        </div>

        {/* Search bar and Status Filter */}
        <div style={{ margin: '5px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by Student ID, School Name, or Phone Number"
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
          
          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '200px',
            }}
          >
            <option value="">Select Status</option>
            <option value="registered">Registered</option>
            <option value="screened">Screened</option>
            <option value="follow-up-completed">Follow Up Completed</option>
            <option value="final-report-generated">Final Report Generated</option>
          </select> */}
        </div>

        {/* Loading State */}
        {loading ? (
          <p>Loading screenings...</p>
        ) : filteredstudents.length > 0 ? (
          <table
            className="camps-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '70px',
            }}
          >
            <thead>
              <tr>
                <th>Student ID</th>
                <th>School Name</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredstudents.map((student) => (
                <tr
                  key={student.studentId}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e6f7ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }}
                >
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.status}</td>
                  <td>{student.phoneNumber}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(student.studentId);
                      }}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No screenings</p>
        )}
      </div>
    </div>
  );
};

export default ViewscreeningsDoctor;
