import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { PieChart, Pie, Cell } from 'recharts';
import 'react-calendar/dist/Calendar.css';
// import './VolunteerDashboard.css';
import { Bell, Home, User, HelpCircle, LogOut } from 'lucide-react';
import axios from 'axios';

const CompletedMeetings = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    phone: '',
  });
  const today = new Date();
  const userName = localStorage.getItem('name') || 'Therapist';

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

  const ageData = [
    { name: '5-12', value: 50, color: '#60C6F0' },
    { name: '0-5', value: 10, color: '#FF7F50' },
    { name: '12-25', value: 30, color: '#90EE90' },
    { name: '>25', value: 10, color: '#DEB887' }
  ];

  const handleChatbotClick = () => {
    setFormPopup(true);
  };
  
  const handleFormSubmit = () => {
    if (patientDetails.name && patientDetails.age && patientDetails.phone) {
      setFormPopup(false);
      navigate('/conduct-screening', { state: { camps: completedCamps } });
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const upcomingCamps = camps.filter(camp => new Date(camp.dateTime) > today);
  const completedCamps = camps.filter(camp => new Date(camp.dateTime) < today && new Date(camp.dateTime).toDateString() !== today.toDateString());
  const ongoingCamps = camps.filter(camp => new Date(camp.dateTime).toDateString() === today.toDateString());


  return (
    <div className="dashboard-container-1">
      {/* Sidebar */}
      <div className="sidebar-1">
        <div className="sidebar-header-1">
          <span className="sidebar-title-1">Therapist</span>
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
          <h1 className="page-title-1">Dashboard - Therapist</h1>

          {/* Cards */}
          <div className="dashboard-cards-1">
            <div className="dashboard-card" onClick={() => navigate('/all-patients', { state: { camps: ongoingCamps } })}>
              <h2>All Patients</h2>
              <p>List Of Patients that have been examined by the therapist as well as the screening bot</p>
              <button>View</button>
            </div>

            <div className="dashboard-card" onClick={handleChatbotClick}>
              <h2>Screening Chatbot</h2>
              <p>PreScreening tool to examine the patient.</p>
              <button>View</button>
            </div>
          </div>

          <div className="bottom-section-1">
            {/* Age Distribution Chart */}
            <div className="analytics-container-1">
              <h2 className="chart-title-1">Age distribution of Children Diagnosed</h2>
              <div className="chart-container-1">
                <PieChart width={400} height={300}>
                  <Pie
                    data={ageData}
                    cx={200}
                    cy={150}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="chart-legend-1">
                  {ageData.map((entry, index) => (
                    <div key={index} className="legend-item-1">
                      <div className="legend-color-1" style={{ backgroundColor: entry.color }}></div>
                      <span>{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form Popup */}
        {formPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3 className="popup-title">Enter Patient Details</h3>
      <form className="popup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter patient's name"
            value={patientDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter patient's age"
            value={patientDetails.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter patient's phone number"
            value={patientDetails.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="popup-actions">
          <button type="button" className="btn-primary" onClick={handleFormSubmit}>
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={() => setFormPopup(false)}>
            Cancel
          </button>
        </div>
      </form>
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
          grid-template-columns: repeat(2, 1fr);
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
          margin-right:30%;
          // grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .analytics-container-1, .calendar-container-1 {
          background: white;
          border-radius: 8px;
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
        
        .popup-content {
          background: white;
          width: 90%;
          max-width: 400px;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }

        .popup-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 16px;
          text-align: center;
          color: #333;
        }

        .popup-form .form-group {
          margin-bottom: 16px;
        }


        .popup-form input {
          width: 500%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .popup-form input:focus {
          outline: none;
          border-color: #60C6F0;
          box-shadow: 0 0 5px rgba(96, 198, 240, 0.5);
        }

        .popup-actions {
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }

        /* Cancel Button Styling */
        .cancel-button {
          background-color: #FF4C4C;  /* Red color */
          color: white;               /* White text */
          padding: 10px 20px;         /* Padding for spacing */
          border: none;               /* Remove default border */
          border-radius: 5px;         /* Rounded corners */
          cursor: pointer;           /* Change cursor on hover */
          transition: background-color 0.2s ease;  /* Smooth transition for background color */
        }

        .cancel-button:hover {
          background-color: #FF2A2A;  /* Darker red on hover */
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

