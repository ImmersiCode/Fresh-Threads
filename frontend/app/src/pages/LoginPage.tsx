import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOtp, verifyOtp } from '../services/authService';
import API from '../services/axios';

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
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

const handleVerifyOtp = async () => {
  try {
    const res = await verifyOtp(phone, otp);
    const token = res.data.token;

    localStorage.setItem('token', token);

    const userRes = await API.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const role = userRes.data.role;

    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  } catch (err) {
    setError('Invalid OTP');
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold mb-4">📱 Login with OTP</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="border px-4 py-2 rounded w-full max-w-xs mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border px-4 py-2 rounded w-full max-w-xs mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}

export default LoginPage;
