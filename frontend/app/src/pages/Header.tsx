import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showNavLinks?: boolean; // Optional prop to control navigation links visibility
  isLoggedIn?: boolean;   // New optional prop to indicate login status
}

function Header({ showNavLinks = false, isLoggedIn = false }: HeaderProps) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Navigates to the landing page (root path)
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigates to the login page
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to landing page after logout
  };

  const handleTrackOrderClick = () => {
    navigate('/track-order'); // Define this route in your App.tsx/routing
  };

  const handlePricesClick = () => {
    navigate('/prices'); // Define this route in your App.tsx/routing
  };

  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-10">
      <h2
        className="text-2xl font-bold text-blue-700 cursor-pointer"
        onClick={handleHomeClick}
      >
        Fresh Threads
      </h2>
      <div className="flex items-center space-x-4">
        {/* Navigation Links for logged-in users */}
        {showNavLinks && (
          <>
            <button
              onClick={handleTrackOrderClick}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Track Order
            </button>
            <button
              onClick={handlePricesClick}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              Prices
            </button>
          </>
        )}

        {/* Conditional rendering for Login/Logout button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;