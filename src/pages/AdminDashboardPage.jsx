import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import StatCard from '../components/StatCard';
import LoadingScreen from '../components/LoadingScreen';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import ChartsPanel from '../components/ChartsPanel';
import ComplaintMap from '../components/ComplaintMap';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState({ statusRows: [], typeRows: [] });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ status: 'pending', resolution_image: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [statsResponse, chartsResponse, complaintsResponse] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/charts'),
        api.get('/complaints', { params: { sort: 'newest' } }),
      ]);
      setStats(statsResponse.data);
      setCharts(chartsResponse.data);
      setComplaints(complaintsResponse.data.complaints);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  }

  const openEdit = (complaint) => {
    setSelected(complaint);
    setForm({ status: complaint.status, resolution_image: null });
  };

  const saveComplaint = async (event) => {
    event.preventDefault();
    if (!selected) return;

    const payload = new FormData();
    payload.append('status', form.status);
    if (form.resolution_image) {
      payload.append('resolution_image', form.resolution_image);
    }

    try {
      await api.patch(`/complaints/${selected.id}`, payload);
      setMessage('Complaint updated.');
      setSelected(null);
      loadAdminData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/complaints/${id}`);
      setMessage('Complaint deleted.');
      loadAdminData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <LoadingScreen />;

  const statsView = stats || {
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedPercentage: 0,
    highPriorityComplaints: 0,
  };

  return (
    <main className="page content-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Admin dashboard</span>
          <h1>Complaint operations</h1>
          <p>Manage status, resolution images, soft deletes, and analytics in one place.</p>
        </div>
      </section>

      {message ? <div className="alert alert-info">{message}</div> : null}

      <div className="stats-row four-up">
        <StatCard label="Total complaints" value={statsView.totalComplaints} />
        <StatCard label="Pending" value={statsView.pendingComplaints} />
        <StatCard label="Resolved %" value={`${statsView.resolvedPercentage}%`} />
        <StatCard label="High priority" value={statsView.highPriorityComplaints} />
      </div>

      <ChartsPanel statusRows={charts.statusRows} typeRows={charts.typeRows} />

      <section className="admin-list-card">
        <h3>All complaints</h3>
        {complaints.length === 0 ? <EmptyState title="No complaints yet" description="Submitted complaints will appear here." /> : null}
        <div className="admin-table">
          {complaints.map((complaint) => (
            <motion.div key={complaint.id} className="admin-row" whileHover={{ scale: 1.01 }}>
              <div className="admin-row-main">
                <strong>{complaint.title}</strong>
                <span>{complaint.location}</span>
                <span>Upvotes: {complaint.upvotes}</span>
              </div>
              <div className="admin-row-side">
                <StatusBadge status={complaint.status} />
                <button className="button button-soft" type="button" onClick={() => openEdit(complaint)}>Manage</button>
                <button className="button button-danger" type="button" onClick={() => deleteComplaint(complaint.id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Modal open={Boolean(selected)} title={selected ? `Manage #${selected.id}` : ''} onClose={() => setSelected(null)}>
        {selected ? (
          <form className="stack-form" onSubmit={saveComplaint}>
            <select className="input" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <input className="input" type="file" accept="image/*" onChange={(event) => setForm({ ...form, resolution_image: event.target.files?.[0] || null })} />
            <button className="button button-primary" type="submit">Save changes</button>
          </form>
        ) : null}
      </Modal>

      {selected ? <ComplaintMap latitude={selected.latitude} longitude={selected.longitude} title={selected.title} location={selected.location} /> : null}
    </main>
  );
}
