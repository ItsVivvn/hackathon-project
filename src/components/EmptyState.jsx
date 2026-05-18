import { SearchX } from 'lucide-react';

export default function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <SearchX size={28} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
