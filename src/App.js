// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import LoginPage from './pages/LoginPage'; // Ensure this file exists in ./pages directory
import RegisterPage from './pages/RegisterPage';
import AdminHome from './pages/AdminHome';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CustomerDashboard from './pages/CustomerDashboard';
import OrderFormPage from './pages/OrderFormPage';
import CustomerSettings from './pages/CustomerSettings';
import AdminMenuManagement from './pages/AdminMenuManagement';
import MenuDetailsPage from './pages/MenuDetailsPage';
import RecipeManagement from './pages/RecipeManagement';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/menus" element={<ProtectedRoute><AdminMenuManagement /></ProtectedRoute>} />

        {/* Customer routes */}
        <Route path="/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/orders/:id" element={<ProtectedRoute><OrderFormPage /></ProtectedRoute>} />
        <Route path="/customer/settings" element={<ProtectedRoute><CustomerSettings /></ProtectedRoute>} />
        <Route path="/menu-details/:id" element={<MenuDetailsPage />} />
        <Route path="/admin/recipes" element={<RecipeManagement />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        
      </Routes>
    </Router>
  );
}

export default App;


