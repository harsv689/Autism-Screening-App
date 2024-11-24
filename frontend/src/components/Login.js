// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [phone, setPhone] = useState(""); // Stores phone number
// //   const [otp, setOtp] = useState(""); // Stores OTP
// //   const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP
// //   const [message, setMessage] = useState(""); // Feedback message
// //   const navigate = useNavigate();

// //   // Send OTP to the backend
// //   const sendOtp = async () => {
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/auth/sendOTP", { phone });
// //       setMessage("OTP sent successfully.");
// //       setStep(2); // Proceed to OTP verification step
// //     } catch (error) {
// //       console.error("Error sending OTP:", error);
// //       setMessage("Failed to send OTP. Please try again.");
// //     }
// //   };

// //   // Verify OTP with the backend
// //   const verifyOtp = async () => {
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/auth/verifyOTP", { phone, otp });
// //       const { token, role, isApproved } = response.data;

// //       if (!isApproved) {
// //         setMessage("Your account is awaiting admin approval.");
// //         return;
// //       }

// //       // Store the token in localStorage
// //       localStorage.setItem("token", token);

// //       // Redirect to the respective dashboard based on the user's role
// //       if (role === "NGO Staff") navigate("/ngo-dashboard");
// //       else if (role === "Doctor") navigate("/doctor-dashboard");
// //       else if (role === "Therapist") navigate("/therapist-dashboard");
// //       else navigate("/"); // Fallback for unknown roles
// //     } catch (error) {
// //       console.error("Error verifying OTP:", error);
// //       setMessage("Invalid OTP. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
// //       <h1>Login</h1>

// //       {/* Step 1: Enter Phone Number */}
// //       {step === 1 && (
// //         <>
// //           <input
// //             type="text"
// //             placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
// //             value={phone}
// //             onChange={(e) => setPhone(e.target.value)}
// //             style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
// //           />
// //           <br />
// //           <button onClick={sendOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
// //             Send OTP
// //           </button>
// //         </>
// //       )}

// //       {/* Step 2: Enter OTP */}
// //       {step === 2 && (
// //         <>
// //           <input
// //             type="text"
// //             placeholder="Enter OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
// //           />
// //           <br />
// //           <button onClick={verifyOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
// //             Verify OTP
// //           </button>
// //         </>
// //       )}

// //       {/* Message Feedback */}
// //       {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}

// //       {/* Registration Link */}
// //       <p style={{ marginTop: "20px" }}>
// //         Don't have an account?{" "}
// //         <span
// //           onClick={() => navigate("/register")}
// //           style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
// //         >
// //           Register Here
// //         </span>
// //       </p>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [phone, setPhone] = useState(""); // Stores phone number
//   const [otp, setOtp] = useState(""); // Stores OTP
//   const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP
//   const [message, setMessage] = useState(""); // Feedback message
//   const navigate = useNavigate();

//   // Send OTP to the backend
//   const sendOtp = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/sendOTP", { phone });
//       setMessage("OTP sent successfully.");
//       setStep(2); // Proceed to OTP verification step
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Failed to send OTP. Please try again.");
//     }
//   };

//   // Verify OTP with the backend
//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/verifyOTP", { phone, otp });
//       const { token, role, isApproved } = response.data;

//       if (!isApproved) {
//         setMessage("Your account is awaiting admin approval.");
//         return;
//       }

//       // Store the token and role in localStorage (for potential future use)
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // Navigate to the respective dashboard based on the user's role
//       if (role === "NGO Staff") {
//         navigate("/ngo-dashboard");
//       } else if (role === "Doctor") {
//         navigate("/doctor-dashboard");
//       } else if (role === "Therapist") {
//         navigate("/therapist-dashboard");
//       } else if (role === "Volunteer") {
//         navigate("/volunteer-dashboard");
//       } else {
//         setMessage("Unknown role. Please contact admin.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Login</h1>

//       {/* Step 1: Enter Phone Number */}
//       {step === 1 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
//           />
//           <br />
//           <button onClick={sendOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
//             Send OTP
//           </button>
//         </>
//       )}

//       {/* Step 2: Enter OTP */}
//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
//           />
//           <br />
//           <button onClick={verifyOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
//             Verify OTP
//           </button>
//         </>
//       )}

//       {/* Message Feedback */}
//       {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}

//       {/* Registration Link */}
//       <p style={{ marginTop: "20px" }}>
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/register")}
//           style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
//         >
//           Register Here
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState(""); // Stores phone number
  const [otp, setOtp] = useState(""); // Stores OTP
  const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP
  const [message, setMessage] = useState(""); // Feedback message
  const navigate = useNavigate();

  // Send OTP to the backend
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/sendOTP", { phone });
      setMessage("OTP sent successfully.");
      setStep(2); // Proceed to OTP verification step
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verifyOTP', { phone, otp });
      const { token, role, isApproved } = response.data;
  
      if (!isApproved) {
        setMessage('Your account is awaiting admin approval.');
        return;
      }
  
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      switch (role) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'NGO Worker':
          navigate('/ngo-dashboard');
          break;
        case 'Doctor':
          navigate('/doctor-dashboard');
          break;
        case 'Therapist':
          navigate('/therapist-dashboard');
          break;
        case 'Volunteer':
          navigate('/volunteer-dashboard');
          break;
        default:
          setMessage('Unknown role. Please contact admin.');
          break;
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Invalid OTP. Please try again.');
    }
  };
  

  // // Verify OTP with the backend
  // const verifyOtp = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/verifyOTP", { phone, otp });
  //     const { token, role, isApproved } = response.data;

  //     if (!isApproved) {
  //       setMessage("Your account is awaiting admin approval.");
  //       return;
  //     }

  //     // Store the token and role in localStorage (for potential future use)
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);

  //     // Navigate to the respective dashboard based on the user's role
  //     if (role === "NGO Worker") {
  //       navigate("/ngo-dashboard");
  //     } else if (role === "Doctor") {
  //       navigate("/doctor-dashboard");
  //     } else if (role === "Therapist") {
  //       navigate("/therapist-dashboard");
  //     } else if (role === "Volunteer") {
  //       navigate("/volunteer-dashboard");
  //     } else {
  //       setMessage("Unknown role. Please contact admin.");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     setMessage("Invalid OTP. Please try again.");
  //   }
  // };

  return (
    <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>

      {/* Step 1: Enter Phone Number */}
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
          />
          <br />
          <button onClick={sendOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
            Send OTP
          </button>
        </>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
          />
          <br />
          <button onClick={verifyOtp} style={{ padding: "8px 20px", cursor: "pointer" }}>
            Verify OTP
          </button>
        </>
      )}

      {/* Message Feedback */}
      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}

      {/* Registration Link */}
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
