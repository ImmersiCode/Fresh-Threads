import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import PricesPage from './pages/pricesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/prices" element={<PricesPage />} />
      <Route element={<RoleProtectedRoute role="USER" />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route element={<RoleProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

    </Routes>
  );
}

export default App;
