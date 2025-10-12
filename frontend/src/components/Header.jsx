import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Header component for the dashboard layout. Displays the app title
 * and top-level navigation links. When a user is authenticated, it
 * shows dashboard, profile, and logout options. For unauthenticated
 * visitors, login and register links are presented.
 */
const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center sticky top-0 z-30">
      <h1 className="text-xl font-bold">
        <Link to="/" className="hover:underline">Investment Platform</Link>
      </h1>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;