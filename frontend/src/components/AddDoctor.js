// import React from 'react';
// import './styles.css';

// const AddDoctor = () => {
//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h1 className="form-heading">Add New Doctor</h1>
//         <form>
//         <div className="form-group">
//             <label>Doctor ID</label>
//             <div className="input-icon-group">
//               <span className="icon">👨‍⚕️</span>
//               <input type="text" placeholder="Enter Doctor ID" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Name</label>
//             <div className="input-icon-group">
//               <span className="icon">✏️</span>
//               <input type="text" placeholder="Enter Name" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Qualifications</label>
//             <div className="input-icon-group">
//               <span className="icon">🎓</span>
//               <input type="text" placeholder="Enter Qualifications" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Gender</label>
//             <div className="input-icon-group">
//               <span className="icon">👤</span>
//               <select>
//                 <option>Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Phone Number</label>
//             <div className="input-icon-group">
//               <span className="icon">📞</span>
//               <input type="tel" placeholder="Enter Phone Number" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Address</label>
//             <div className="input-icon-group">
//               <span className="icon">🏠</span>
//               <input type="text" placeholder="Enter Address" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Past Experiences</label>
//             <div className="input-icon-group">
//               <span className="icon">🔖</span>
//               <textarea placeholder="Enter Past Experiences"></textarea>
//             </div>
//           </div>
//           <button type="submit" className="submit-button">Add</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;

import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    doctorId: '',
    name: '',
    qualifications: '',
    gender: '',
    phoneNumber: '',
    address: '',
    pastExperiences: '',
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/addDoctor', doctor);
      alert('Doctor added successfully');
    } catch (error) {
      alert('Error adding doctor');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Add New Doctor</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Doctor ID</label>
            <input type="text" name="doctorId" placeholder="🆔 Enter Doctor ID" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="✏️ Enter Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Qualifications</label>
            <input type="text" name="qualifications" placeholder="🎓 Enter Qualifications" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="📞 Enter Phone Number" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" placeholder="🏠 Enter Address" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Past Experiences</label>
            <textarea name="pastExperiences" placeholder="🔖 Enter Past Experiences" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;