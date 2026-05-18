import { motion } from 'framer-motion';
import { ArrowUp, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const priorityClassMap = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

export default function ComplaintCard({ complaint, onUpvote }) {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/complaint/${complaint.id}`);

  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote?.(complaint.id);
  };

  return (
    <motion.article
      className={`complaint-card ${priorityClassMap[complaint.priority] || ''}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') handleCardClick(); }}
    >
      {complaint.image ? (
        <a className="complaint-image-link" href={complaint.image} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
          <img className="complaint-image" src={complaint.image} alt={complaint.title} />
        </a>
      ) : (
        <div className="complaint-image placeholder">No image</div>
      )}
      <div className="complaint-body">
        <div className="complaint-meta-row">
          <StatusBadge status={complaint.status} />
          <span className="priority-pill">{complaint.priority}</span>
        </div>
        <h3>
          <Link to={`/complaint/${complaint.id}`} onClick={(e) => e.stopPropagation()}>{complaint.title}</Link>
        </h3>
        <p>{complaint.description}</p>
        <div className="complaint-footer">
          <span className="location-chip">
            <MapPin size={14} /> {complaint.location}
          </span>
          <button className="button button-soft" type="button" onClick={handleUpvote}>
            <ArrowUp size={15} />
            {complaint.upvotes}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
