import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ShopkeeperDashboard from './components/Shopkeeper/ShopkeeperDashboard';
import ManageMedicines from './components/Shopkeeper/ManageMedicines';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import SearchMedicines from './components/Customer/SearchMedicines';
import SearchResults from './components/Customer/SearchResults';
import ShopDetails from './components/Customer/ShopDetails';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Shopkeeper Protected Routes */}
        <Route
          path="/shopkeeper/dashboard"
          element={<ProtectedRoute component={ShopkeeperDashboard} role="shopkeeper" />}
        />
        <Route
          path="/shopkeeper/manage-medicines"
          element={<ProtectedRoute component={ManageMedicines} role="shopkeeper" />}
        />

        {/* Customer Protected Routes */}
        <Route
          path="/customer/dashboard"
          element={<ProtectedRoute component={CustomerDashboard} role="customer" />}
        />
        <Route
          path="/customer/search-medicines"
          element={<ProtectedRoute component={SearchMedicines} role="customer" />}
        />
        <Route
          path="/customer/search-results"
          element={<ProtectedRoute component={SearchResults} role="customer" />}
        />
        <Route
          path="/customer/shop-details/:shopId"
          element={<ProtectedRoute component={ShopDetails} role="customer" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
