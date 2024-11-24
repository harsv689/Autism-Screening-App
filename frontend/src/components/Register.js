// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Register = () => {
// //   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Doctor' });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('/api/auth/register', formData);
// //       alert('Registered successfully');
// //       navigate('/login'); // Redirect to login page after successful registration
// //     } catch (error) {
// //       console.error('Registration error:', error.response ? error.response.data : error.message);
// //       alert('Error registering');
// //     }
// //   };

// //   return (
// //     <div className="form-container">
// //       <form className="auth-form" onSubmit={handleSubmit}>
// //         <h2>Register</h2>
// //         <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
// //         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// //         <select name="role" onChange={handleChange}>
// //           <option value="Doctor">Doctor</option>
// //           <option value="NGO Worker">NGO Worker</option>
// //           <option value="Volunteer">Volunteer</option>
// //           <option value="Therapist">Therapist</option>
// //         </select>
// //         <button type="submit">Register</button>
// //         <p>
// //           Already have an account? <Link to="/login">Login</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Doctor' });
//   const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', formData);
//       alert('Registered successfully');
//       navigate('/login');
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setErrorMessage(error.response.data.message); // Display specific error message
//       } else {
//         setErrorMessage('An error occurred during registration');
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
//         <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <select name="role" onChange={handleChange}>
//           <option value="Doctor">Doctor</option>
//           <option value="NGO Worker">NGO Worker</option>
//           <option value="Volunteer">Volunteer</option>
//           <option value="Therapist">Therapist</option>
//         </select>
//         <button type="submit">Register</button>
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', gender: '', address: '', role: 'Doctor' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      alert('Registration request submitted successfully. Admin approval required.');
      navigate('/login');
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone Number" onChange={handleChange} required />
        <input name="gender" type="text" placeholder="Gender" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Doctor">Doctor</option>
          <option value="NGO Worker">NGO Worker</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
