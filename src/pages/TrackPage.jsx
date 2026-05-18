import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TrackPage() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  return (
    <main className="page auth-page">
      <motion.section className="form-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Track by ID</span>
        <h1>Look up a complaint</h1>
        <p>Enter a complaint ID to open its detail page immediately.</p>
        <form className="stack-form" onSubmit={(event) => { event.preventDefault(); if (id) navigate(`/complaint/${id}`); }}>
          <input className="input" type="number" min="1" placeholder="Complaint ID" value={id} onChange={(event) => setId(event.target.value)} required />
          <button className="button button-primary" type="submit">Track complaint</button>
        </form>
      </motion.section>
    </main>
  );
}
