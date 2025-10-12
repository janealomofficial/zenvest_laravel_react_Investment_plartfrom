import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header';
import { useAuth } from '../../context/AuthContext';

/**
 * DashboardLayout wraps dashboard pages with a sidebar and top header.
 * It reads the current user's role from the Auth context and passes it
 * down to the Sidebar component. The main content is rendered in
 * the children prop.
 */
const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  // Determine role safely; default to empty string to prevent undefined errors
  const role = user?.role || '';
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar stays fixed on the left */}
      <Sidebar role={role} />
      {/* Content area pushes to the right by the sidebar width */}
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;