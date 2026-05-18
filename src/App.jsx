import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import TrackPage from './pages/TrackPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AnimatedPage({ children }) {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('civictrack_theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('civictrack_theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={logout} theme={theme} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
          <Route path="/dashboard" element={<ProtectedRoute><AnimatedPage><DashboardPage /></AnimatedPage></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><AnimatedPage><ReportPage /></AnimatedPage></ProtectedRoute>} />
          <Route path="/track" element={<ProtectedRoute><AnimatedPage><TrackPage /></AnimatedPage></ProtectedRoute>} />
          <Route path="/complaint/:id" element={<AnimatedPage><ComplaintDetailsPage /></AnimatedPage>} />
          <Route path="/admin/login" element={<AnimatedPage><AdminLoginPage /></AnimatedPage>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AnimatedPage><AdminDashboardPage /></AnimatedPage></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

