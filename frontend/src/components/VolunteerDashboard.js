import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { PieChart, Pie, Cell } from 'recharts';
import 'react-calendar/dist/Calendar.css';
import { Bell, Home, User, HelpCircle, LogOut } from 'lucide-react';
import axios from 'axios';

const CompletedMeetings = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();
  const userName = localStorage.getItem('name') || 'Volunteer';

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('/api/auth/camps');
      const volunteerCamps = response.data.filter(camp => camp.volunteer === userName);
      setCamps(volunteerCamps);
      console.log(volunteerCamps);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const openPopup = (selectedDate) => {
    const campsForDate = camps.filter(camp => new Date(camp.dateTime).toDateString() === selectedDate.toDateString());
    setSelectedDateCamps(campsForDate);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDateCamps([]);
  };
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isOngoingOrUpcomingCamp = camps.some(camp => {
        const campDate = new Date(camp.dateTime);
        return campDate.toDateString() === date.toDateString() && campDate >= today;
      });

      return isOngoingOrUpcomingCamp ? 'highlighted-date' : null;
    }
    return null;
  };



  return (
    <div className="dashboard-container-1">
      {/* Sidebar */}
      <div className="sidebar-1">
        <div className="sidebar-header-1">
          <span className="sidebar-title-1">Volunteer</span>
        </div>

        <div className="sidebar-menu-1">
          <button onClick={() => navigate('/dashboard')} className="sidebar-item-1">
            <Home className="sidebar-icon-1" />
            <span>Home</span>
          </button>

          <button onClick={() => navigate('/profile')} className="sidebar-item-1">
            <User className="sidebar-icon-1" />
            <span>Profile</span>
          </button>

          <button onClick={() => navigate('/support')} className="sidebar-item-1">
            <HelpCircle className="sidebar-icon-1" />
            <span>Support</span>
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="sidebar-item-1 logout-button-1"
        >
          <LogOut className="sidebar-icon-1" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content-1">
        {/* Header */}
        <div className="header-1">
          <div className="header-left-1">
            {/* <img src="/home/harsv69/Desktop/dsi/dsi-project-portal/frontend/public/Choice_Foundation.png" alt="Choice Foundation" className="logo" /> */}
            <h2 className="header-title-1">Choice Foundation</h2>
          </div>
          <div className="header-right-1">
            <button className="notification-button-1">
              <Bell />
            </button>
            <div className="user-info-1">
              <span className="greeting-1">Hi there,</span>
              <span className="username-1">{userName}</span>
              {/* <img src="/api/placeholder/40/40" alt="Profile" className="profile-image" /> */}
            </div>
          </div>
        </div>

        <div className="dashboard-content-1">
          <h1 className="page-title-1">Dashboard - Volunteer</h1>

          {/* Cards */}
          <div className="dashboard-cards-1">
          <div className="dashboard-card" onClick={() => navigate('/camps-in-progress', { state: { camps: camps } })}>
            <h2>Camps In Progress</h2>
            <p style={{color: 'black'}}>List of Camps scheduled for today.</p>
            <button>View</button>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/completed-camps', { state: { camps: camps } })}>
            <h2>Completed Camps</h2>
            <p style={{color: 'black'}}>List of Camps completed in the past.</p>
            <button>View</button>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/upcoming-camps', { state: { camps: camps } })}>
            <h2>Upcoming Camps</h2>
            <p style={{color: 'black'}}>List of Camps scheduled for future dates.</p>
            <button>View</button>
          </div>
          </div>

          <div className="bottom-section-1">
            {/* Age Distribution Chart */}
            <div className="calendar-container-1">
          <h2>Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            onClickDay={openPopup}
          />
        </div>
          </div>
        </div>
        {/* Form Popup */}
        {showPopup && (
        <div class="popup-overlay">
          <div class="popup-content">
            <h3>Camps Scheduled for {date.toDateString()}</h3>
            {selectedDateCamps.length > 0 ? (
              <table className="camps-table" style={{color: 'black'}}>
                <thead>
                  <tr>
                    <th>Camp ID</th>
                    <th>School Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateCamps.map((camp) => (
                    <tr key={camp.campID}>
                      <td>{camp.campID}</td>
                      <td>{camp.schoolName}</td>
                      <td>{camp.location}</td>
                      <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                      <td>{camp.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No camps scheduled for this date.</p>
            )}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      </div>

      <style jsx>{`
        .dashboard-container-1 {
          display: flex;
          min-height: 100vh;
          background-color: #F5F7FB;
        }

        /* Sidebar Styles */
        .sidebar-1 {
          width: 256px;
          background: linear-gradient(180deg, #9F69B8 0%, #4D8BCC 100%);
          padding: 32px;
          display: flex;
          flex-direction: column;
          color: white;
        }

        .sidebar-header-1 {
          margin-bottom: 48px;
        }

        .sidebar-title-1 {
          font-size: 24px;
          font-weight: bold;
        }

        .sidebar-menu-1 {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-item-1 {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
          text-align: left;
        }

        .sidebar-item-1:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .sidebar-icon-1 {
          width: 20px;
          height: 20px;
        }

        .logout-button-1 {
          margin-top: auto;
        }

        /* Main Content Styles */
        .main-content-1 {
          flex: 1;
          overflow-y: auto;
        }

        /* Header Styles */
        .header-1 {
          background: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .header-left-1 {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo-1 {
          height: 48px;
        }

        .header-title-1 {
          font-size: 24px;
          font-weight: bold;
        }

        .header-right-1 {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .notification-button-1 {
          padding: 8px;
          border-radius: 50%;
          border: none;
          background: #f1f1f1;
          cursor: pointer;
        }

        .user-info-1 {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .greeting-1 {
          color: #666;
        }

        .username-1 {
          font-weight: 600;
        }

        .profile-image-1 {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        /* Dashboard Content Styles */
        .dashboard-content-1 {
          padding: 32px;
        }

        .page-title-1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 32px;
        }

        .dashboard-cards-1 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 24px;
          margin-left: 10px;
        }

        .dashboard-card-1 {
          background: white;
          border-radius: 8px;
          padding: 24px;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          height: 170px;
          display: flex;
          flex-direction: column;
        }

        .dashboard-card-1::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background-color: #9F69B8;
          border-radius: 8px 0 0 8px;
        }

        .dashboard-card-1 h2 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .dashboard-card-1 p {
          color: #666;
          font-size: 14px;
          margin-bottom: auto;
        }

        .dashboard-card-1 button-1 {
          background: #3060ff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 24px;
          cursor: pointer;
          align-self: center;
        }

        .bottom-section-1 {
          display: grid;
          align-item:center;
          margin-left:30%;
          margin-right:40%;
          margin-top:5%;
          // grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .analytics-container-1, .calendar-container-1 {
          background: white;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .chart-title-1 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .chart-container-1 {
          position: relative;
        }

        .chart-legend-1 {
          position: absolute;
          top: 35%;
          // left: 50%;
          right:20%;
          // transform: translate(-50%, -50%);
          text-align: center;
        }

        .legend-item-1 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .legend-color-1 {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        /* Calendar Styles */
        .custom-calendar-1 {
          width: 100%;
          border: none;
        }

        .highlighted-date-1 {
          background-color: #3060ff !important;
          color: white !important;
          border-radius: 50%;
        }

        /* React Calendar Customization */
        .react-calendar-1 {
          border: none;
          font-family: Arial, sans-serif;
        }

        .react-calendar__tile-1 {
          padding: 10px;
          font-size: 14px;
        }

        .react-calendar__navigation button-1 {
          font-size: 16px;
          color: #333;
        }

        .react-calendar__month-view__weekdays-1 {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 12px;
          color: #666;
        }
        
        .dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

/* Top section: Only Dashboard cards */
.top-section {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

/* Bottom section: Analytics on the left and Calendar on the right */
.bottom-section {
  display: flex;
  justify-content: space-between;

  gap: 20px;
 
}

/* Dashboard cards styling */
.dashboard-cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.dashboard-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: 170px;
  width: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dashboard-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background-color: #b3a4ff;
  border-radius: 8px 0 0 8px;
}

.dashboard-card h2 {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding-left: 10px;
}

.dashboard-card p {

  font-size: 14px;
  padding-left: 10px;
}

.dashboard-card button {
  background-color: #3060ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  width: 100px;
  align-self: center;
}
.adjust {
  display: flex;
  flex:row;
  gap: 600px;

}
.h2 {
  margin-left: 0px;
  color:#333333;
}
.calendar-container1{

  
  margin-left:300px;
}




@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

        
      `}</style>
    </div>
  );
};

export default CompletedMeetings;


