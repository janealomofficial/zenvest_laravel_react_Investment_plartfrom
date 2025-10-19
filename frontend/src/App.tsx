import React from 'react';
import "@fontsource/lexend"; // Default Lexend font
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/700.css";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InvestorDashboard from './pages/InvestorDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import MyBusinesses from './pages/Owner/MyBusinesses';
import ApplicationFormPage from './pages/ApplicationFormPage';
import InvestmentPage from './pages/InvestmentPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Businesses from './pages/Admin/Businesses';


/**
 * Component to redirect the user to the appropriate dashboard based on
 * their role. If the user is an admin, they are sent to the admin
 * dashboard; investors and admins share the investor dashboard; business
 * owners are sent to their own dashboard. Assumes `user` exists in
 * context.
 */
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'investor') return <Navigate to="/investor/dashboard" replace />;
  // default to business owner dashboard
  return <Navigate to="/owner/dashboard" replace />;
};

const App = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />

      {/* Generic dashboard redirect */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Admin routes */}
      <Route
        path="/admin/businesses"
        element={
          <ProtectedRoute roles={['admin']}>
            <Businesses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={['admin']}>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* Investor routes */}
      <Route
        path="/investor/dashboard"
        element={
          <ProtectedRoute roles={['investor', 'admin']}>
            <InvestorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investments"
        element={
          <ProtectedRoute roles={['investor', 'admin']}>
            <InvestmentPage />
          </ProtectedRoute>
        }
      />

      {/* Business owner routes */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute roles={['business_owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications/new"
        element={
          <ProtectedRoute roles={['business_owner']}>
            <ApplicationFormPage />
          </ProtectedRoute>
        }
      />

      {/* Business owner businesses route */}
      <Route
        path="/owner/businesses"
        element={
          <ProtectedRoute roles={['business_owner']}>
            <MyBusinesses />
          </ProtectedRoute>
        }
      />
      {/* We leave a placeholder for My Businesses page; if not implemented it will show NotFound */}

      {/* Profile accessible to any logged in user */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;