import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      await login(form);
      setStatus({ loading: false, error: '', success: 'Logged in successfully' });
      navigate(from, { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Login failed', success: '' });
    }
  };

  return (
    <main className="page auth-page">
      <motion.section className="form-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">User login</span>
        <h1>Welcome back</h1>
        <p>Log in to report, track, and upvote civic complaints.</p>
        <form onSubmit={handleSubmit} className="stack-form">
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          {status.error ? <div className="alert alert-error">{status.error}</div> : null}
          {status.success ? <div className="alert alert-success">{status.success}</div> : null}
          <button className="button button-primary" type="submit" disabled={status.loading}>
            {status.loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="aux-text">
          No account? <Link to="/register">Create one</Link>
        </p>
      </motion.section>
    </main>
  );
}
