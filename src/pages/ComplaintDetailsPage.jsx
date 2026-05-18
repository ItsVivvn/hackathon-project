import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { ArrowUp, MapPin } from 'lucide-react';
import api from '../api/client';
import StatusBadge from '../components/StatusBadge';
import LoadingScreen from '../components/LoadingScreen';
import ComplaintMap from '../components/ComplaintMap';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    async function loadComplaint() {
      try {
        const response = await api.get(`/complaints/${id}`);
        setComplaint(response.data.complaint);
      } catch (requestError) {
        setLoadError(requestError.response?.data?.message || 'Complaint not found');
      } finally {
        setLoading(false);
      }
    }

    loadComplaint();
  }, [id]);

  const handleUpvote = async () => {
    try {
      const response = await api.post(`/complaints/${id}/upvote`);
      setComplaint((current) => (current ? { ...current, upvotes: response.data.upvotes } : current));
      setAlertMessage('Upvoted');
      setTimeout(() => setAlertMessage(''), 2500);
    } catch (requestError) {
      setAlertMessage(requestError.response?.data?.message || 'Unable to upvote');
      setTimeout(() => setAlertMessage(''), 3500);
    }
  };

  if (loading) return <LoadingScreen />;

  if (loadError) {
    return (
      <main className="page content-page">
        <div className="alert alert-error">{loadError}</div>
      </main>
    );
  }

  return (
    <main className="page content-page detail-layout">
      <section className="detail-card">
        {alertMessage ? <div className="alert alert-info">{alertMessage}</div> : null}
        <div className="detail-topline">
          <StatusBadge status={complaint.status} />
          <span className="priority-pill">{complaint.priority}</span>
        </div>
        <h1>{complaint.title}</h1>
        <p className="detail-copy">{complaint.description}</p>
        <div className="detail-grid">
          <span><MapPin size={14} /> {complaint.location}</span>
          <span>Type: {complaint.type}</span>
          <span>Complaint ID: {complaint.id}</span>
          <span>Submitted by: {complaint.user_name}</span>
        </div>
        {user ? (
          <button className="button button-soft" type="button" onClick={handleUpvote}><ArrowUp size={16} /> Upvote ({complaint.upvotes})</button>
        ) : (
          <Link className="button button-ghost" to="/login">Login to upvote</Link>
        )}
      </section>

      {complaint.image ? (
        <a href={complaint.image} target="_blank" rel="noreferrer">
          <img className="detail-image" src={complaint.image} alt={complaint.title} />
        </a>
      ) : null}

      {complaint.resolution_image ? (
        <section className="resolution-block">
          <h4>Resolution image</h4>
          <a href={complaint.resolution_image} target="_blank" rel="noreferrer">
            <img className="detail-image resolution" src={complaint.resolution_image} alt={`Resolution for ${complaint.title}`} />
          </a>
        </section>
      ) : null}

      <ComplaintMap latitude={complaint.latitude} longitude={complaint.longitude} title={complaint.title} location={complaint.location} />
    </main>
  );
}
