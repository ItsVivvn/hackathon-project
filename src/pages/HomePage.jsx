import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, MapPinned, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThoughtCard from '../components/ThoughtCard';
import { getThoughtOfDay } from '../data/thoughts';

const features = [
  { icon: AlertTriangle, title: 'Report issues quickly', text: 'Upload a photo, describe the problem, and file it in one clean flow.' },
  { icon: Search, title: 'Track by ID', text: 'Residents can search, filter, and follow the status of each complaint.' },
  { icon: CheckCircle2, title: 'Resolve visibly', text: 'Admins can update status, upload proof, and keep the record transparent.' },
  { icon: MapPinned, title: 'Map-aware', text: 'Latitude and longitude are supported for complaints that need location context.' },
];

export default function HomePage() {
  const thought = getThoughtOfDay();

  return (
    <main className="page hero-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Lavasa civic reporting</span>
          <h1>Report. Track. Improve your city.</h1>
          <p>
            CivicTrack is a modern platform that enables residents to report, track, and resolve civic issues efficiently.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/login">Login</Link>
            <Link className="button button-soft" to="/dashboard">View Issues</Link>
          </div>
        </div>
        <div className="hero-stats glass-card">
            <div>
              <Sparkles size={20} />
              <strong>Easy Issue Reporting</strong>
              <span>Quickly report problems like potholes, streetlights, or road damage in just a few steps.</span>
            </div>
            <div>
              <Sparkles size={20} />
              <strong>Community Driven</strong>
              <span>See issues reported by others and support them through upvotes.</span>
            </div>
          </div>
      </section>

      <section className="section-grid">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            className="feature-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ scale: 1.03 }}
          >
            <feature.icon size={22} />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </motion.article>
        ))}
      </section>

      <ThoughtCard thought={thought} />
    </main>
  );
}
