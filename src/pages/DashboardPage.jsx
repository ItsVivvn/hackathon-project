import { useDeferredValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCcw } from 'lucide-react';
import api from '../api/client';
import ComplaintCard from '../components/ComplaintCard';
import EmptyState from '../components/EmptyState';
import FiltersBar from '../components/FiltersBar';
import LoadingScreen from '../components/LoadingScreen';
import StatCard from '../components/StatCard';

const initialFilters = { search: '', type: '', status: '', priority: '', sort: 'newest' };

export default function DashboardPage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const deferredSearch = useDeferredValue(filters.search);

  useEffect(() => {
    loadComplaints();
  }, [filters.type, filters.status, filters.priority, filters.sort, deferredSearch]);

  async function loadComplaints() {
    setLoading(true);
    try {
      const response = await api.get('/complaints', {
        params: { ...filters, search: deferredSearch },
      });
      setComplaints(response.data.complaints);
      setTotal(response.data.total);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  }

  const handleUpvote = async (id) => {
    try {
      await api.post(`/complaints/${id}/upvote`);
      setStatusMessage('Upvote added.');
      loadComplaints();
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Upvote failed');
    }
  };

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <main className="page content-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Resident dashboard</span>
          <h1>Active complaints</h1>
          <p>Search, filter, and monitor the issues currently reported in CivicTrack.</p>
        </div>
        <div className="header-actions">
          <button className="button button-soft" type="button" onClick={loadComplaints}><RefreshCcw size={16} /> Refresh</button>
          <button className="button button-primary" type="button" onClick={() => navigate('/report')}><Plus size={16} /> New complaint</button>
        </div>
      </section>

      <div className="stats-row">
        <StatCard label="Total visible" value={total} hint="Complaints in the current view" />
      </div>

      <FiltersBar filters={filters} onChange={updateFilter} onReset={() => setFilters(initialFilters)} />
      {statusMessage ? <div className="alert alert-info">{statusMessage}</div> : null}

      {loading ? <LoadingScreen /> : null}
      {!loading && complaints.length === 0 ? (
        <EmptyState title="No complaints found" description="Try adjusting the filters or submit the first issue." />
      ) : null}

      <div className="cards-grid">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} onUpvote={handleUpvote} />
        ))}
      </div>
    </main>
  );
}
