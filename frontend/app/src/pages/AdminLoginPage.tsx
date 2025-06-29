import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/authService';

function AdminLoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await adminLogin(phone, password);
      const token = res.data.token;
      localStorage.setItem('token', token);

      // Redirect to /admin
      navigate('/admin');
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-semibold mb-4">🛠 Admin Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Phone number"
        className="border px-4 py-2 rounded w-full max-w-xs mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 rounded w-full max-w-xs mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}

export default AdminLoginPage;
