import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar component used across all dashboard pages. The sidebar
 * displays navigation links relevant to the authenticated user's role.
 * Pass the current `role` as a prop to control which links are shown.
 */
const Sidebar = ({ role }) => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-5 fixed left-0 top-0 z-40 flex flex-col justify-between">
      {/* Top portion with heading and links */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {role === 'admin' && 'Admin Panel'}
          {role === 'business_owner' && 'Business Owner'}
          {role === 'investor' && 'Investor Panel'}
        </h2>
        <nav className="flex flex-col space-y-3">
          {/* All roles have a dashboard link */}
          <Link to="/dashboard" className="hover:text-yellow-400">
            Home
          </Link>
          {/* Investor specific links */}
          {role === 'investor' && (
            <>
              <Link to="/investor/dashboard" className="hover:text-yellow-400">
                Dashboard
              </Link>
              <Link to="/investments" className="hover:text-yellow-400">
                My Investments
              </Link>
            </>
          )}
          {/* Business owner specific links */}
          {role === 'business_owner' && (
            <>
              <Link to="/owner/dashboard" className="hover:text-yellow-400">
                Dashboard
              </Link>
              <Link to="/applications/new" className="hover:text-yellow-400">
                Submit Application
              </Link>
              <Link to="/owner/businesses" className="hover:text-yellow-400">
                My Businesses
              </Link>
            </>
          )}
          {/* Administrator specific links */}
          {role === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="hover:text-yellow-400">
                Dashboard
              </Link>
              <Link to="/admin/users" className="hover:text-yellow-400">
                Manage Users
              </Link>
            </>
          )}
        </nav>
      </div>
      {/* Bottom footer */}
      <div className="text-sm text-gray-400 mt-6">
        <p>© {new Date().getFullYear()} Investment Platform</p>
      </div>
    </aside>
  );
};

export default Sidebar;