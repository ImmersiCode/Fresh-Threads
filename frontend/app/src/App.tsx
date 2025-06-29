import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

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
