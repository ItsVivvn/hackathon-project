import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });

    try {
      await adminLogin(form);
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Admin login failed' });
      return;
    }

    setStatus({ loading: false, error: '' });
  };

  return (
    <main className="page auth-page">
      <motion.section className="form-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Admin access</span>
        <h1>Admin login</h1>
        <p>Use the seeded admin account to manage complaints and review analytics.</p>
        <form onSubmit={handleSubmit} className="stack-form">
          <input className="input" type="email" placeholder="Admin email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          {status.error ? <div className="alert alert-error">{status.error}</div> : null}
          <button className="button button-primary" type="submit" disabled={status.loading}>
            {status.loading ? 'Signing in...' : 'Admin sign in'}
          </button>
        </form>
      </motion.section>
    </main>
  );
}
