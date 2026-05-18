export default function FiltersBar({ filters, onChange, onReset }) {
  return (
    <div className="filters-bar">
      <input
        className="input"
        placeholder="Search by title or location"
        value={filters.search}
        onChange={(event) => onChange('search', event.target.value)}
      />
      <select className="input" value={filters.type} onChange={(event) => onChange('type', event.target.value)}>
        <option value="">All types</option>
        <option value="road">Road</option>
        <option value="water">Water</option>
        <option value="waste">Waste</option>
        <option value="lighting">Lighting</option>
        <option value="sanitation">Sanitation</option>
        <option value="other">Other</option>
      </select>
      <select className="input" value={filters.status} onChange={(event) => onChange('status', event.target.value)}>
        <option value="">All status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <select className="input" value={filters.priority} onChange={(event) => onChange('priority', event.target.value)}>
        <option value="">All priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select className="input" value={filters.sort} onChange={(event) => onChange('sort', event.target.value)}>
        <option value="newest">Newest</option>
        <option value="upvotes">Top upvotes</option>
      </select>
      <button className="button button-ghost" type="button" onClick={onReset}>Reset</button>
    </div>
  );
}
