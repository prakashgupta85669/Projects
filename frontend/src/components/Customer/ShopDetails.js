import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShopDetails.css';

function ShopDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { shop, searchedMedicines, backData } = location.state || {};

  if (!shop) {
    navigate('/customer/search-medicines');
    return null;
  }

  return (
    <div className="container">
      <h2>{shop.shopName}</h2>
      <p><strong>Mobile:</strong> {shop.mobile}</p>
      <p><strong>Location:</strong> {shop.location.localArea}, {shop.location.district}, {shop.location.city}, {shop.location.state}, {shop.location.country}</p>

      <h3>Medicines You Searched:</h3>
      <ul>
        {shop.medicines
          .filter(med => searchedMedicines.includes(med.name))
          .map((med, idx) => (
            <li key={idx}>{med.name} - Quantity: {med.quantity}</li>
          ))
        }
      </ul>

      <button onClick={() => navigate('/customer/search-results', { state: backData })}>
        Back to Results
      </button>
    </div>
  );
}

export default ShopDetails;
