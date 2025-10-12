import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Simple 404 Not Found page. Displayed when no route matches.
 */
const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
    </div>
  );
};

export default NotFound;