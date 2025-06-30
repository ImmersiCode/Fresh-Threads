import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Ensure Header.tsx is imported

function LandingPage() {
  const navigate = useNavigate(); // Still needed if you add more navigation

  const handleLearnMoreClick = () => {
    // You could navigate to a dedicated "About Us" or "How It Works" page
    // For now, let's keep it simple or remove if not needed
    console.log("Learn More clicked!");
  };

  const handleSeePricesClick = () => {
    navigate('/prices'); // Navigate to the prices page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header component. No need for isLoggedIn or showNavLinks for landing page. */}
      <Header />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight animate-fade-in-down">
          Fresh Threads
          <span className="block text-3xl md:text-4xl text-gray-700 font-semibold mt-2">
            Laundry & Dry Cleaning
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl animate-fade-in">
          Effortless laundry and dry cleaning, delivered right to your door.
          Experience convenience, quality, and a fresh new approach.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleSeePricesClick}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-in"
          >
            See Our Prices
          </button>
          <button
            onClick={handleLearnMoreClick}
            className="text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-in delay-100"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Optional: Add a simple features section or call to action if desired below the fold */}
      <section className="py-12 bg-white text-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">Why Choose Fresh Threads?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Convenient Pickup & Delivery</h3>
              <p>Schedule pickups and deliveries right from your phone.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
              <p>Professional cleaning for all your garments, from everyday to delicates.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p>Transparent and competitive rates without hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (simple example) */}
      <footer className="py-6 bg-blue-700 text-white text-center text-sm">
        &copy; {new Date().getFullYear()} Fresh Threads. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;