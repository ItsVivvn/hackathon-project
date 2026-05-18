import { motion } from 'framer-motion';

export default function ThoughtCard({ thought }) {
  return (
    <motion.section className="thought-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <span className="eyebrow">Thought of the Day</span>
      <p>{thought}</p>
    </motion.section>
  );
}
