import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import TrackCargo from './pages/public/TrackCargo';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import CargoManagement from './pages/admin/CargoManagement';
import CargoForm from './pages/admin/CargoForm';
import TrackingHistory from './pages/admin/TrackingHistory';
import Customers from './pages/admin/Customers';
import CustomerDetail from './pages/admin/CustomerDetail';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';
import Profile from './pages/admin/Profile';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<TrackCargo />} />
          <Route path="/admin-login" element={<Login />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/cargo" element={<ProtectedRoute><CargoManagement /></ProtectedRoute>} />
          <Route path="/admin/cargo/new" element={<ProtectedRoute><CargoForm /></ProtectedRoute>} />
          <Route path="/admin/cargo/:id/edit" element={<ProtectedRoute><CargoForm /></ProtectedRoute>} />
          <Route path="/admin/cargo/:id/tracking" element={<ProtectedRoute><TrackingHistory /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/admin/customers/:id" element={<ProtectedRoute><CustomerDetail /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;