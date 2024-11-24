// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import AddDoctor from './components/AddDoctor';
// import AddStudent from './components/AddStudent';
// import ScheduleCamp from './components/ScheduleCamp';
// import DashboardNGO from './components/DashboardNGO';
// import DoctorDashboard from './components/DoctorDashboard';
// import TherapistDashboard from './components/TherapistDashboard'
// import VolunteerDashboard from './components/VolunteerDashboard'; // Import Volunteer Dashboard
// import UpcomingCamps from './components/Volunteer/UpcomingCamps';
// import CompletedCamps from './components/Volunteer/CompletedCamps';
// import CampsInProgress from './components/Volunteer/CampsInProgress';
// import CampDetails from './components/Volunteer/CampDetails';
// import ViewStudents from './components/Volunteer/ViewStudents';
// import Logout from './components/Logout';
// import CampDetailsStaff from './components/Staff/CampDetails';
// import ConductScreening from './components/ChatWindow';
// import StudentProfile from './components/StudentProfile';
// import StaffCompletedCamps from './components/Staff/CompletedCamps';
// import StaffUpcomingCamps from './components/Staff/UpcomingCamps';
// import ProfilePage from './components/ProfilePage';
// import SuportPage from './components/HelpDeskPage'
// import EditProfile from './components/EditProfile'
// import './components/auth.css';
// import CompletedMeetings from './components/Doctor/CompletedMeetings';
// import ScheduledMeetings from './components/Doctor/ScheduledMeetings';
// import UnscheduledMeetings from './components/Doctor/UnscheduledMeetings';
// import AllPatients from './components/Therapist/CompletedCamps';
// import LandingPage from './components/LandingPage';
// function App() {
//   const [role, setRole] = useState(() => localStorage.getItem('role') || null);

//   useEffect(() => {
//     if (role) {
//       localStorage.setItem('role', role);
//     } else {
//       localStorage.removeItem('role');
//     }
//   }, [role]);

//   return (
//     <Router>
//       <Routes>
//       <Route path="/landing-page" element={<LandingPage/>} />
//       <Route path="/all-patients" element={<AllPatients/>} />
//         <Route path="/completed-meetings" element={<CompletedMeetings/>} />
//         <Route path="/scheduled-meetings" element={<ScheduledMeetings/>} />
//         <Route path="/unscheduled-meetings" element={<UnscheduledMeetings/>} />
//         <Route path="/" element={<Navigate to="/landing-page" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/upcoming-camps" element={<UpcomingCamps />} />
//         <Route path="/completed-camps" element={<CompletedCamps />} />
//         <Route path="/camps-in-progress" element={<CampsInProgress />} />
//         <Route path="/camp-details" element={<CampDetails />} />
//         <Route path="/camp-details-staff" element={<CampDetailsStaff />} />
//         <Route path="/login" element={<Login setRole={setRole} />} />
//         <Route path="/patients-list" element={<ViewStudents />} />
//         <Route path="/student-profile" element={<StudentProfile />} />
//         <Route path="/conduct-screening" element={<ConductScreening />} />
//         <Route path="/completed-camps-staff" element={<StaffCompletedCamps />} />
//         <Route path="/upcoming-camps-staff" element={<StaffUpcomingCamps />} />
//         <Route path="/support" element={<SuportPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/editprofile" element={<EditProfile />} />
//         <Route path="/adddoctor" element={<AddDoctor />} />
//         {/* Conditional Routing Based on Role */}
//         {/* Conditional Routing Based on Role */}
//         <Route path="/dashboard" element={
//           role === 'Doctor' ? <DoctorDashboard /> :
//             role === 'NGO Worker' ? <DashboardNGO /> :
//               role === 'Volunteer' ? <VolunteerDashboard /> : // Render Volunteer Dashboard for Volunteers
//                 role === 'Therapist' ? <TherapistDashboard /> :
//                   <Navigate to="/login" />
//         } />

//         {/* Additional Routes */}
//         <Route path="/add-student" element={<AddStudent />} />
//         <Route path="/schedule-camp" element={<ScheduleCamp />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddDoctor from './components/AddDoctor';
import AddStudent from './components/AddStudent';
import ScheduleCamp from './components/ScheduleCamp';
import DashboardNGO from './components/DashboardNGO';
import DoctorDashboard from './components/DoctorDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import VolunteerDashboard from './components/VolunteerDashboard'; // Import Volunteer Dashboard
import UpcomingCamps from './components/Volunteer/UpcomingCamps';
import CompletedCamps from './components/Volunteer/CompletedCamps';
import CampsInProgress from './components/Volunteer/CampsInProgress';
import CampDetails from './components/Volunteer/CampDetails';
import ViewStudents from './components/Volunteer/ViewStudents';
import Logout from './components/Logout';
import CampDetailsStaff from './components/Staff/CampDetails';
import ConductScreening from './components/ChatWindow';
import StudentProfile from './components/StudentProfile';
import StaffCompletedCamps from './components/Staff/CompletedCamps';
import StaffUpcomingCamps from './components/Staff/UpcomingCamps';
import ProfilePage from './components/ProfilePage';
import SuportPage from './components/HelpDeskPage'
import EditProfile from './components/EditProfile'
import CampDetailsCompleted from './components/Volunteer/CampDetailsCompleted';
import CampDetailsUpComing from './components/Volunteer/CampDetailsUpcoming';
import MeetingDetails from './components/Doctor/MeetingDetails';
import './components/auth.css';
import CompletedMeetings from './components/Doctor/CompletedMeetings';
import ScheduledMeetings from './components/Doctor/ScheduledMeetings';
import UnscheduledMeetings from './components/Staff/UnscheduledMeetings';
import AllPatients from './components/Therapist/CompletedCamps';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';

import Meetings_inprogress from './components/Doctor/InProgressMeetings';
import ViewStudentsDoctor from './components/Doctor/StudentsList';
import StudentDetailsDoctor from './components/StudentProfileDoctor';
import AddVolunteer from './components/AddVolunteer';
import ReportView from './components/report';
function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  return (
    <Router>
      <Routes>
      <Route path="/landing-page" element={<LandingPage/>} />
      <Route path="/all-patients" element={<AllPatients/>} />
        <Route path="/completed-meetings" element={<CompletedMeetings/>} />
        <Route path="/scheduled-meetings" element={<ScheduledMeetings/>} />
        <Route path="/unscheduled-meetings" element={<UnscheduledMeetings/>} />
        <Route path="/in-progress-meetings" element={<Meetings_inprogress/>} />
        <Route path="/" element={<Navigate to="/landing-page" />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/support" element={<SuportPage />} />

        {/* Profile Management */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* Dashboard Routes */}
        <Route path="/ngo-dashboard" element={<DashboardNGO />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Conditional Dashboard Redirect Based on Role */}
        <Route
          path="/dashboard"
          element={
            role === 'Doctor' ? (
              <Navigate to="/doctor-dashboard" />
            ) : role === 'Admin' ? (
              <Navigate to="/admin-dashboard" />
            ) : role === 'NGO Worker' ? (
              <Navigate to="/ngo-dashboard" />
            ) : role === 'Volunteer' ? (
              <Navigate to="/volunteer-dashboard" />
            ) : role === 'Therapist' ? (
              <Navigate to="/therapist-dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Volunteer-Specific Routes */}
        <Route path="/upcoming-camps" element={<UpcomingCamps />} />
        <Route path="/completed-camps" element={<CompletedCamps />} />
        <Route path="/camps-in-progress" element={<CampsInProgress />} />
        <Route path="/camp-details" element={<CampDetails />} />
        <Route path="/camp-details-completed" element={<CampDetailsCompleted />} />
        <Route path="/camp-details-upcoming" element={<CampDetailsUpComing />} />
        <Route path="/meeting-details" element={<MeetingDetails />} />
        <Route path="/camp-details-staff" element={<CampDetailsStaff />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/patients-list" element={<ViewStudents />} />
        <Route path='/meetings-students-list' element={<ViewStudentsDoctor />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path='/student-profile-doctor' element={<StudentDetailsDoctor />} />
        <Route path="/conduct-screening" element={<ConductScreening />} />
        <Route path="/completed-camps-staff" element={<StaffCompletedCamps />} />
        <Route path="/upcoming-camps-staff" element={<StaffUpcomingCamps />} />
        <Route path="/conduct-screening" element={<ConductScreening />} />

        {/* Doctor-Specific Routes */}
        <Route path="/completed-meetings" element={<CompletedMeetings />} />
        <Route path="/scheduled-meetings" element={<ScheduledMeetings />} />
        <Route path="/unscheduled-meetings" element={<UnscheduledMeetings />} />

        {/* Therapist-Specific Routes */}
        <Route path="/all-patients" element={<AllPatients />} />

        {/* Add and Schedule Routes */}
        <Route path="/adddoctor" element={<AddDoctor />} />
        <Route path="/addvolunteer" element={<AddVolunteer />} />
        <Route path="/reportview" element={<ReportView />} />
        {/* Conditional Routing Based on Role */}
        {/* Conditional Routing Based on Role */}
        <Route path="/dashboard" element={
          role === 'Doctor' ? <DoctorDashboard /> :
            role === 'NGO Worker' ? <DashboardNGO /> :
              role === 'Volunteer' ? <VolunteerDashboard /> : // Render Volunteer Dashboard for Volunteers
                role === 'Therapist' ? <TherapistDashboard /> :
                  <Navigate to="/login" />
        } />

        {/* Additional Routes */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/schedule-camp" element={<ScheduleCamp />} />
      </Routes>
    </Router>
  );
}

export default App;
