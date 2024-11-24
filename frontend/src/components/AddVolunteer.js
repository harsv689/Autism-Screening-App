// import React from 'react';
// import './styles.css';

// const AddVolunteer = () => {
//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h1 className="form-heading">Add New Volunteer</h1>
//         <form>
//           <div className="form-group">
//             <label>Volunteer ID</label>
//             <div className="input-icon-group">
//               <span className="icon">👤</span>
//               <input type="text" placeholder="Enter Volunteer ID" />
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
//             <label>Date and Time</label>
//             <div className="input-icon-group">
//               <span className="icon">📅</span>
//               <input type="datetime-local" />
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
//               <input type="text" placeholder='Enter Phone Number' />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Address</label>
//             <div className="input-icon-group">
//               <span className="icon">🏠</span>
//               <input type="tel" placeholder="Enter Address" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Past History</label>
//             <div className="input-icon-group">
//               <span className="icon">📂</span>
//               <textarea placeholder="Enter Past History"></textarea>
//             </div>
//           </div>

//           <button type="submit" className="submit-button">Add</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddVolunteer;

import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const AddVolunteer = () => {
  const [volunteer, setVolunteer] = useState({
    volunteerId: '',
    name: '',
    dateTime: '',
    gender: '',
    phoneNumber: '',
    address: '',
    pastHistory: '',
  });

  const handleChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/addVolunteer', volunteer);
      alert('Volunteer added successfully');
    } catch (error) {
      alert('Error adding volunteer');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Add New Volunteer</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Volunteer ID</label>
           
            <input type="text" name="volunteerId" placeholder="👤 Enter Volunteer ID" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="✏️ Enter Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" name="dateTime" onChange={handleChange} required />
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
            <label>Past History</label>
            <textarea name="pastHistory" placeholder="📂 Enter Past History" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteer;