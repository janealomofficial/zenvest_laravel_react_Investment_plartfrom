import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Smooth scroll handler for homepage sections
  const handleScroll = (id) => {
    // Helper to perform the actual scroll
    const scrollToSection = () => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    };

    // If we are not already on the homepage, navigate first
    if (window.location.pathname !== "/") {
      navigate("/");
      // Wait for React to render the homepage before scrolling
      setTimeout(scrollToSection, 800);
    } else {
      scrollToSection();
    }
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
      <h1 className="text-xl font-bold cursor-pointer">
        <Link
          to="/"
          onClick={() => handleScroll("home")}
          className="hover:underline"
        >
          Investment Platform
        </Link>
      </h1>

      <nav className="flex items-center space-x-6">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-200 transition">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-gray-200 transition">
              Profile
            </Link>
            <button
              onClick={logout}
              className="hover:text-gray-200 transition focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleScroll("home")}
              className="hover:text-gray-200 transition"
            >
              Home
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="hover:text-gray-200 transition"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("features")}
              className="hover:text-gray-200 transition"
            >
              Features
            </button>
            <button
              onClick={() => handleScroll("solutions")}
              className="hover:text-gray-200 transition"
            >
              Solutions
            </button>
            <button
              onClick={() => handleScroll("benefits")}
              className="hover:text-gray-200 transition"
            >
              Benefits
            </button>
            <button
              onClick={() => handleScroll("testimonial")}
              className="hover:text-gray-200 transition"
            >
              Testimonial
            </button>
            <button
              onClick={() => handleScroll("faq")}
              className="hover:text-gray-200 transition"
            >
              FAQ
            </button>

            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 rounded-full border border-white hover:bg-white hover:text-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
