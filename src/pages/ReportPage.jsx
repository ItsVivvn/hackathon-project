import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import MapPicker from '../components/MapPicker';

export default function ReportPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'road',
    location: '',
    latitude: '',
    longitude: '',
    priority: 'medium',
    image: null,
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        payload.append(key, value);
      }
    });

    try {
      await api.post('/complaints', payload);
      setStatus({ loading: false, error: '', success: 'Complaint submitted successfully' });
      setForm({ title: '', description: '', type: 'road', location: '', latitude: '', longitude: '', priority: 'medium', image: null });
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Submission failed', success: '' });
    }
  };

  return (
    <main className="page content-page">
      <motion.section className="form-card wide-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Report complaint</span>
        <h1>Submit an issue</h1>
        <p>Upload an image, choose the place on the map (Lavasa, Pune), and route the complaint into the system.</p>
        <form className="stack-form two-column-form" onSubmit={handleSubmit}>
          <input className="input" placeholder="Title" value={form.title} onChange={(event) => handleChange('title', event.target.value)} required />
          <select className="input" value={form.type} onChange={(event) => handleChange('type', event.target.value)}>
            <option value="road">Road</option>
            <option value="water">Water</option>
            <option value="waste">Waste</option>
            <option value="lighting">Lighting</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Other</option>
          </select>
          <textarea className="input input-textarea" placeholder="Describe the issue" value={form.description} onChange={(event) => handleChange('description', event.target.value)} required />
          <input className="input" placeholder="Location" value={form.location} onChange={(event) => handleChange('location', event.target.value)} required />
          <MapPicker onChange={(coords) => { handleChange('latitude', coords.latitude); handleChange('longitude', coords.longitude); }} />
          <div className="full-span">
            <label className="muted">Selected coordinates</label>
            <div className="two-up">
              <input className="input" placeholder="Latitude" value={form.latitude || ''} readOnly />
              <input className="input" placeholder="Longitude" value={form.longitude || ''} readOnly />
            </div>
          </div>
          <select className="input" value={form.priority} onChange={(event) => handleChange('priority', event.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input className="input" type="file" accept="image/*" onChange={(event) => handleChange('image', event.target.files?.[0] || null)} />
          {status.error ? <div className="alert alert-error full-span">{status.error}</div> : null}
          {status.success ? <div className="alert alert-success full-span">{status.success}</div> : null}
          <button className="button button-primary full-span" type="submit" disabled={status.loading}>
            {status.loading ? 'Submitting...' : 'Submit complaint'}
          </button>
        </form>
      </motion.section>
    </main>
  );
}
