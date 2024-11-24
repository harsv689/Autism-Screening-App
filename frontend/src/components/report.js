// import "./report.css";
// import logo from './Choice_logo.png'
// import pic from './pic.png'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// function PreScreeningReport() {
//   const [ReportData, setReportData] = useState(null);
//   const [ProfileData,setProfileData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const screeningId = localStorage.getItem('screening-id');
//   const name = localStorage.getItem('name');
//   const studentId = localStorage.getItem('student-id');
//   const role = localStorage.getItem('role');
//   const fetchReportData = async () => {
//     if (!screeningId) {
//       setError('User information not found');
//       setLoading(false);
//       return;
//     }
//     let apiEndpoint = `/api/auth/Reportdata/${screeningId}`;
//     try {
//       const response = await axios.get(apiEndpoint);
//       setReportData(response.data.document);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//       setError('Failed to load Report');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReportData();
//   }, [screeningId]);


//   const fetchProfileData = async () => {
//     if (!studentId) {
//       setError('User information not found');
//       setLoading(false);
//       return;
//     }
//     let apiEndpoint = `/api/auth/ReportdataS/${studentId}`;
//     try {
//       const response = await axios.get(apiEndpoint);
//       setProfileData(response.data.document);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//       setError('Failed to load Report');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [studentId]);
  
//   console.log(ReportData)
//   console.log(ProfileData)
//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-container">{error}</div>;
//   }

//   if (!ReportData) {
//     return <div className="no-data">No Report data found</div>;
//   }
//   return (
//     <div className="container">
//       <div className="header">
//         <img src={logo} alt="Choice Foundation Logo" />
//         <h1>Choice Foundation</h1>
//         <h2>Report</h2>
//       </div>
//       <div className="download">Download Report</div>
//       <div className="main-content">
//         <div className="profile">
//           <img src={pic} alt="Profile Picture" />
//           <div className="profile-info">
//             <h2>{ProfileData.name}</h2>
//             <p>Student ID: {studentId}</p>
//             <p>Gender: Female</p>
//           </div>
//         </div>
//         <div className="autism-score">
//           <h2>Status of Autism</h2>
//           <p> From Chatbot:- {ReportData.report.diagnosis}</p>
//           <p> From Doctor:- {ReportData.diagnosis}</p>
//         </div>
//       </div>
//       <div className="details">
//         <div className="details-section">
//           <div className="info">
//             <p><strong>Volunteer Name:</strong> {ProfileData.volunteer}</p>
//             <p><strong>Camp Id:</strong> {ProfileData.campId}</p>
//             <p><strong>Contact Details:</strong> {ProfileData.phoneNumber}</p>
//             <p><strong>Address:</strong> {ProfileData.address}</p>
//             <p><strong>Past Experiences:</strong> {ProfileData.pastHistory}</p>
//             <p><strong>Screening Date:</strong> {new Date(ReportData.date).toLocaleDateString()}</p>
//             <p><strong>Screening Date:</strong> {new Date(ReportData.report.dateTime).toLocaleDateString()}</p>
//             </div>
//           <div className="observations">
//             <h3>Core Observations</h3>
//             <p>Verbal Communication Confidence: High</p>
//             <p>Non Verbal Communication Confidence: Low</p>
//             <p>Sensory Processing: Moderate</p>
//             <p>Repetitive Behaviour: Very High</p>
//             <p>Motor Skills: High</p>
//             <p>Preservative Thinking: Low</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PreScreeningReport;
import "./report.css";
import logo from './Choice_logo.png';
import pic from './pic.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function PreScreeningReport() {
  const [ReportData, setReportData] = useState(null);
  const [ProfileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const screeningId = localStorage.getItem('screening-id');
  const studentId = localStorage.getItem('student-id');

  const fetchReportData = async () => {
    if (!screeningId) {
      setError('User information not found');
      setLoading(false);
      return;
    }
    let apiEndpoint = `/api/auth/Reportdata/${screeningId}`;
    try {
      const response = await axios.get(apiEndpoint);
      setReportData(response.data.document);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError('Failed to load Report');
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    if (!studentId) {
      setError('User information not found');
      setLoading(false);
      return;
    }
    let apiEndpoint = `/api/auth/ReportdataS/${studentId}`;
    try {
      const response = await axios.get(apiEndpoint);
      setProfileData(response.data.document);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError('Failed to load Profile');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
    fetchProfileData();
  }, [screeningId, studentId]);

  const generatePDF = () => {
    const input = document.querySelector('.container'); // Select the container to convert
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a PDF instance
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('PreScreeningReport.pdf'); // Save the file
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!ReportData) {
    return <div className="no-data">No Report data found</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Choice Foundation Logo" />
        <h1 style={{color:'white'}}>Report</h1>
      </div>
      <div className="main-content">
        <div className="profile">
          <img src={pic} alt="Profile Picture" />
          <div className="profile-info">
            <h2>{ProfileData.name}</h2>
            <p>Student ID: {studentId}</p>
            <p>Gender: {ProfileData.gender}</p>
          </div>
        </div>
        <div className="autism-score">
          <h2>Status of Autism</h2>
          <p>From Chatbot: {ReportData.report.diagnosis}</p>
          <p>From Doctor: {ReportData.diagnosis}</p>
        </div>
      </div>
      <div className="details">
        <div className="details-section">
          <div className="info">
            <p><strong>Volunteer Name:</strong> {ProfileData.volunteer}</p>
            <p><strong>Volunteer Id:</strong> {ReportData.volunteerId}</p>
            <p><strong>Camp Id:</strong> {ProfileData.campId}</p>
            <p><strong>Contact Details:</strong> {ProfileData.phoneNumber}</p>
            <p><strong>Address:</strong> {ProfileData.address}</p>
            <p><strong>Past Experiences:</strong> {ProfileData.pastHistory}</p>
            <p><strong>Screening Id:</strong> {ReportData.screeningId}</p>
            <p><strong>Screening Date:</strong> {new Date(ReportData.date).toLocaleDateString()}</p>
            <p><strong>Screening Date:</strong> {new Date(ReportData.report.dateTime).toLocaleDateString()}</p>
          </div>
          <div className="observations">
            <h3>Core Observations</h3>
            <p>Verbal Communication Confidence: High</p>
            <p>Non Verbal Communication Confidence: Low</p>
            <p>Sensory Processing: Moderate</p>
            <p>Repetitive Behaviour: Very High</p>
            <p>Motor Skills: High</p>
            <p>Preservative Thinking: Low</p>
          </div>
        </div>
      </div>
      <button
        className="download-button"
        onClick={generatePDF}
      >
        Download PDF
      </button>
    </div>
  );
}

export default PreScreeningReport;
