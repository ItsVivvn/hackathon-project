import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });

    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Registration failed' });
      return;
    }

    setStatus({ loading: false, error: '' });
  };

  return (
    <main className="page auth-page">
      <motion.section className="form-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Create account</span>
        <h1>Join CivicTrack</h1>
        <p>Register as a resident user and start reporting local issues.</p>
        <form onSubmit={handleSubmit} className="stack-form">
          <input className="input" type="text" placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          {status.error ? <div className="alert alert-error">{status.error}</div> : null}
          <button className="button button-primary" type="submit" disabled={status.loading}>
            {status.loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="aux-text">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </motion.section>
    </main>
  );
}
