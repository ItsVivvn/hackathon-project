const labelMap = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{labelMap[status] || status}</span>;
}
