import { motion } from 'framer-motion';

export default function StatCard({ label, value, hint }) {
  return (
    <motion.div className="stat-card" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint ? <small>{hint}</small> : null}
    </motion.div>
  );
}
