import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state;

  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await api.post('/search/find', searchData);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Error fetching search results');
    }
  };

  useEffect(() => {
    if (!searchData) {
      navigate('/customer/search-medicines');
    } else {
      fetchResults();
    }
  }, []);

  const handleViewDetails = (shop) => {
    navigate(`/customer/shop-details/${shop.shopId}`, {
      state: { shop, searchedMedicines: searchData.medicineNames, backData: searchData }
    });
  };

  return (
    <div className="container">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No shops found with the specified medicines and location.</p>
      ) : (
        <ul>
          {results.map((shop, idx) => (
            <li key={idx}>
              <strong>{shop.shopName}</strong> ({shop.mobile})
              <button onClick={() => handleViewDetails(shop)}>View Details</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/customer/search-medicines')}>Back to Search</button>
    </div>
  );
}

export default SearchResults;
