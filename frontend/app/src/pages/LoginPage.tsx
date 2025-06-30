import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOtp, verifyOtp } from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await requestOtp(phone);
      setOtpSent(true);
      setError('');
    } catch {
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(phone, otp);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setTimeout(() => navigate('/home'), 300);
    } catch {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Fresh Threads</h1>
        <p className="text-sm text-gray-500 mb-6">
          Laundry and Dry Cleaning
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default LoginPage;
