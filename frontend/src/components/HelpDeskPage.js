import React from 'react';
import './HelpDeskPage.css';

const HelpDeskPage = () => {
  return (
    <div className="help-desk">
      <header className="header">
        <h1  style={{color: 'white'}}>Help Desk and Support</h1>
        <a href="/dashboard" style={{textDecoration:'none',fontSize:'30px',fontWeight:'bold',color:'white'}}>Home</a>
        <a href="/profile" style={{textDecoration:'none',fontSize:'30px',fontWeight:'bold',color:'white'}}>Profile</a>
        <a href="/" style={{textDecoration:'none',fontSize:'30px',fontWeight:'bold',color:'white'}}>Logout</a>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>🔍</button>
        </div>

      </header>
      <div className="content">
        <div className="overview">
          <h2 style={{color: 'black'}}>Overview:</h2>
          <p style={{color: 'black'}}>
            Each user type (Volunteer, Doctor, NGO Staff) has a dedicated dashboard with different functionalities. On clicking each option, new screens will be displayed (either form-based or list-based). A Support option is available on all screens for assistance.
          </p>
        </div>
        <div className="main-section">
          <div className="dashboard-section">
            <div className="dashboard">
              <h3>Volunteer Dashboard</h3>
              <ul>
                <li>View Screening Camps</li>
                <ul>
                  <li>Upcoming Camps</li>
                  <li>In-Progress Camps</li>
                  <li>Completed Camps</li>
                </ul>
                <li>Manage Profile</li>
                <li>Recently Screened Students</li>
                <li>Support</li>
              </ul>
            </div>
            <div className="dashboard">
              <h3>Doctor Dashboard</h3>
              <ul>
                <li>Manage Meetings</li>
                <ul>
                  <li>Scheduled Meetings</li>
                  <li>Unscheduled Meetings</li>
                  <li>Completed Meetings</li>
                </ul>
                <li>Recently Held Meetings</li>
                <li>Support</li>
              </ul>
            </div>
            <div className="dashboard">
              <h3>NGO Staff Dashboard</h3>
              <ul>
                <li>Schedule Screening Camps</li>
                <ul>
                  <li>Create New Camps</li>
                </ul>
                <li>View Camps</li>
                <li>Recently Viewed Camps</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="directory-section">
            <h3>Directory Structure</h3>
            <pre className="directory">
              {`
              - Volunteer Dashboard
                ├── View Screening Camps
                │   ├── Upcoming Camps (List Screen)
                │   ├── In-Progress Camps (List Screen)
                │   └── Completed Camps (List Screen)
                ├── Manage Profile
                │   └── Edit Profile (Form Screen)
                ├── Recently Screened Students
                │   └── List of Students (List Screen)

              - Doctor Dashboard
                ├── Manage Meetings
                │   ├── Scheduled Meetings (List Screen)
                │   ├── Unscheduled Meetings (List Screen)
                │   └── Completed Meetings (List Screen)
                ├── Recently Held Meetings
                │   └── List of Meetings (List Screen)

              - NGO Staff Dashboard
                ├── Schedule Screening Camps
                │   └── New Camp (Form Screen)
                ├── View Camps
                │   ├── Upcoming Camps (List Screen)
                │   └── Completed Camps (List Screen)
                ├── Recently Viewed Camps
                │   └── List of Viewed Camps (List Screen)

              - Support Option (Available on every screen)
              `}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskPage;
