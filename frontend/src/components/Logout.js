import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ margin: '10px', padding: '8px', fontSize: '16px' }}>
      Logout
    </button>
  );
};

export default Logout;
