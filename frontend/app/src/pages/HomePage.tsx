import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming Header.tsx is in the same directory

function HomePage() {
  // We no longer need handleLogout here as it's moved to the Header
  // const navigate = useNavigate(); // No longer needed directly here for logout

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Pass a prop indicating the user is logged in, so Header shows logout and nav links */}
      <Header isLoggedIn={true} showNavLinks={true} />

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          🏠 Welcome to Fresh Threads!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your laundry and dry cleaning dashboard awaits.
        </p>
        {/* Logout button removed from here */}
      </div>
    </div>
  );
}

export default HomePage;