import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

/**
 * Sidebar component used across all dashboard pages.
 * Displays navigation links depending on the authenticated user's role.
 */
const Sidebar = () => {
  const { user } = useAuth(); // ✅ Access user from context
  const location = useLocation(); // ✅ To highlight active links
  const role = user?.role;

  // Helper for highlighting active routes
  const isActive = (path) =>
    location.pathname === path ? "text-yellow-400 font-semibold" : "hover:text-yellow-400";

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-5 fixed left-0 top-0 z-40 flex flex-col justify-between">
      {/* Top section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          {role === "admin" && "Admin Panel"}
          {role === "business_owner" && "Business Owner"}
          {role === "investor" && "Investor Panel"}
        </h2>

        <nav className="flex flex-col space-y-3">
          {/* Common Link */}
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Home
          </Link>

          {/* Investor Links */}
          {role === "investor" && (
            <>
              <Link
                to="/investor/dashboard"
                className={isActive("/investor/dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/investments"
                className={isActive("/investments")}
              >
                My Investments
              </Link>
            </>
          )}

          {/* Business Owner Links */}
          {role === "business_owner" && (
            <>
              <Link
                to="/owner/dashboard"
                className={isActive("/owner/dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/applications/new"
                className={isActive("/applications/new")}
              >
                Submit Application
              </Link>
              <Link
                to="/owner/businesses"
                className={isActive("/owner/businesses")}
              >
                My Businesses
              </Link>
            </>
          )}

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className={isActive("/admin/dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={isActive("/admin/users")}
              >
                Manage Users
              </Link>
              <Link
                to="/admin/businesses"
                className={isActive("/admin/businesses")}
              >
                Manage Businesses
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-400 mt-6">
        <p>© {new Date().getFullYear()} Investment Platform</p>
      </div>
    </aside>
  );
};

export default Sidebar;
