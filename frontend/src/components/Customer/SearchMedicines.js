import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchMedicines.css';

function SearchMedicines() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    medicineNames: '',
    country: '',
    state: '',
    city: '',
    district: '',
    localArea: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      medicineNames: formData.medicineNames.split(',').map(name => name.trim()),
      location: {
        country: formData.country,
        state: formData.state,
        city: formData.city,
        district: formData.district,
        localArea: formData.localArea,
      }
    };

    navigate('/customer/search-results', { state: searchData });
  };

  return (
    <div className="container">
      <h2>Search Medicines</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="medicineNames"
          placeholder="Enter medicine names, separated by commas"
          required
          onChange={handleChange}
        />
        <input type="text" name="country" placeholder="Country" required onChange={handleChange} />
        <input type="text" name="state" placeholder="State" required onChange={handleChange} />
        <input type="text" name="city" placeholder="City" required onChange={handleChange} />
        <input type="text" name="district" placeholder="District" required onChange={handleChange} />
        <input type="text" name="localArea" placeholder="Local Area" required onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchMedicines;
