import { Link, NavLink } from 'react-router-dom';
import { LogOut, MoonStar, ShieldCheck, SunMedium } from 'lucide-react';

export default function Navbar({ user, onLogout, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark"><ShieldCheck size={18} /></span>
          <span>
            <strong>CivicTrack</strong>
            <small>Lavasa civic reporting</small>
          </span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/track">Track</NavLink>
          {user && user.role === 'admin' ? <NavLink to="/admin/dashboard">Admin</NavLink> : null}
        </nav>

        <div className="topbar-actions">
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          {user ? (
            <button className="button button-ghost" type="button" onClick={onLogout}>
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="auth-links">
              <Link className="button button-ghost" to="/login">Login</Link>
              <Link className="button button-primary" to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
