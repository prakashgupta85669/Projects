import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
    mobile: '',
    shopName: '',
    country: '',
    state: '',
    city: '',
    district: '',
    localArea: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      };

      if (formData.userType === 'shopkeeper') {
        dataToSend.mobile = formData.mobile;
        dataToSend.shopName = formData.shopName;
        dataToSend.location = {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          district: formData.district,
          localArea: formData.localArea,
        };
      }

      const res = await api.post('/auth/register', dataToSend);
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="userType" required onChange={handleChange}>
          <option value="">Select User Type</option>
          <option value="shopkeeper">Shopkeeper</option>
          <option value="customer">Customer</option>
        </select>

        {formData.userType === 'shopkeeper' && (
          <>
            <input type="text" name="shopName" placeholder="Shop Name" required onChange={handleChange} />
            <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" required onChange={handleChange} />
            <input type="text" name="state" placeholder="State" required onChange={handleChange} />
            <input type="text" name="city" placeholder="City" required onChange={handleChange} />
            <input type="text" name="district" placeholder="District" required onChange={handleChange} />
            <input type="text" name="localArea" placeholder="Local Area" required onChange={handleChange} />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
