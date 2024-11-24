// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const AdminDashboard = () => {
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       const res = await axios.get('/api/auth/users');
// //       setUsers(res.data);
// //     };
// //     fetchUsers();
// //   }, []);

// //   const approveDoctor = async (id) => {
// //     try {
// //       await axios.put(`/api/auth/approveDoctor/${id}`);
// //       alert('Doctor approved successfully');
// //     } catch (error) {
// //       alert('Error approving doctor');
// //     }
// //   };

// //   const assignAdmin = async (id) => {
// //     try {
// //       await axios.put(`/api/auth/assignAdmin/${id}`);
// //       alert('User promoted to admin successfully');
// //     } catch (error) {
// //       alert('Error assigning admin role');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Admin Dashboard</h1>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Phone</th>
// //             <th>Role</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user._id}>
// //               <td>{user.name}</td>
// //               <td>{user.phone}</td>
// //               <td>{user.role}</td>
// //               <td>
// //                 {user.role === 'Doctor' && !user.isApproved && (
// //                   <button onClick={() => approveDoctor(user._id)}>Approve</button>
// //                 )}
// //                 {user.role !== 'Admin' && (
// //                   <button onClick={() => assignAdmin(user._id)}>Promote to Admin</button>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('/api/auth/admin/users', {
//           headers: { Authorization: localStorage.getItem('token') },
//         });
//         setUsers(res.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const approveUser = async (id) => {
//     try {
//       await axios.put(`/api/auth/admin/approve/${id}`, {}, {
//         headers: { Authorization: localStorage.getItem('token') },
//       });
//       alert('User approved successfully');
//     } catch (error) {
//       console.error('Error approving user:', error);
//     }
//   };

//   const promoteToAdmin = async (id) => {
//     try {
//       await axios.put(`/api/auth/admin/promote/${id}`, {}, {
//         headers: { Authorization: localStorage.getItem('token') },
//       });
//       alert('User promoted to admin successfully');
//     } catch (error) {
//       console.error('Error promoting user:', error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`/api/auth/admin/delete/${id}`, {
//         headers: { Authorization: localStorage.getItem('token') },
//       });
//       alert('User deleted successfully');
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.phone}</td>
//               <td>{user.role}</td>
//               <td>
//                 {user.role !== 'Admin' && (
//                   <button onClick={() => promoteToAdmin(user._id)}>Promote to Admin</button>
//                 )}
//                 {!user.isApproved && (
//                   <button onClick={() => approveUser(user._id)}>Approve</button>
//                 )}
//                 <button onClick={() => deleteUser(user._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/auth/admin/users', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setUsers(res.data);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      await axios.put(`/api/auth/admin/approve/${id}`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('User approved successfully');
      setUsers(users.map(user => user._id === id ? { ...user, isApproved: true } : user));
    } catch (error) {
      console.error('Error approving user:', error);
      setError('Error approving user');
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await axios.put(`/api/auth/admin/promote/${id}`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('User promoted to admin successfully');
      setUsers(users.map(user => user._id === id ? { ...user, role: 'Admin' } : user));
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      setError('Error promoting user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/auth/admin/delete/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('User deleted successfully');
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.isApproved ? 'Yes' : 'No'}</td>
              <td>
                {!user.isApproved && (
                  <button onClick={() => approveUser(user._id)}>Approve</button>
                )}
                {user.role !== 'Admin' && (
                  <button onClick={() => promoteToAdmin(user._id)}>Promote to Admin</button>
                )}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
