import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Landing page shown to unauthenticated users. Explains the purpose of
 * the platform and links to login and registration pages.
 */
const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Investment Platform</h1>
      <p className="mb-6">
        Connect investors with small business owners seeking funding. Register as an investor to
        discover promising businesses, or sign up as a business owner to apply for investments.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;