import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthData } from '../../services/auth';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const { user } = getAuthData();

  return (
    <div className="container">
      <h2>Welcome, Customer!</h2>
      <p>Email: {user?.email}</p>

      <Link to="/customer/search-medicines">
        <button>Search Medicines</button>
      </Link>
    </div>
  );
}

export default CustomerDashboard;
