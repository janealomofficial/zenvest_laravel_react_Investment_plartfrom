import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';

/**
 * Profile page displaying the logged-in user's details. Includes a
 * logout button to end the session.
 */
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user ? (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;