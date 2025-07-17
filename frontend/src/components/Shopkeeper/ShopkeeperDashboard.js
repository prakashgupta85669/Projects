import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthData } from '../../services/auth';
import './ShopkeeperDashboard.css';

function ShopkeeperDashboard() {
  const { user } = getAuthData();

  return (
    <div className="container">
      <h2>Welcome, Shopkeeper!</h2>
      <p>Email: {user?.email}</p>
      <p>Shop Name: {user?.shopName || "Your Shop"}</p>

      <Link to="/shopkeeper/manage-medicines">
        <button>Manage Medicines</button>
      </Link>
    </div>
  );
}

export default ShopkeeperDashboard;
