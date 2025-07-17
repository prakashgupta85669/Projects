// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { clearAuthData, getAuthData } from '../../services/auth';
// import './Navbar.css';

// function Navbar() {
//   const navigate = useNavigate();
//   const { user } = getAuthData();

//   const handleLogout = () => {
//     clearAuthData();
//     navigate('/login');
//   };

//   return (
//     <nav>
//       <h3>🩺 MediLocator</h3>
//       {user ? (
//         <>
//           {user.userType === 'shopkeeper' && (
//             <>
//               <Link to="/shopkeeper/dashboard">Dashboard</Link>
//               <Link to="/shopkeeper/manage-medicines">Manage Medicines</Link>
//             </>
//           )}
//           {user.userType === 'customer' && (
//             <>
//               <Link to="/customer/dashboard">Dashboard</Link>
//               <Link to="/customer/search-medicines">Search Medicines</Link>
//             </>
//           )}
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData, getAuthData } from '../../services/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user } = getAuthData();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3>🩺 MediLocator</h3>
      <div className="nav-links">
        {user ? (
          <>
            {user.userType === 'shopkeeper' && (
              <>
                <Link to="/shopkeeper/dashboard">Dashboard</Link>
                <Link to="/shopkeeper/manage-medicines">Manage Medicines</Link>
              </>
            )}
            {user.userType === 'customer' && (
              <>
                <Link to="/customer/dashboard">Dashboard</Link>
                <Link to="/customer/search-medicines">Search Medicines</Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
