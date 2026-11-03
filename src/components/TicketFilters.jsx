import { STATUSES, PRIORITIES, STATUS_LABELS, PRIORITY_LABELS } from "../constants";

// Fully controlled: the values live in the parent (TicketsPage) and every
// change is reported back through the on... callbacks (child -> parent).
function TicketFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}) {
  return (
    <div className="filters">
      <label>
        Search:
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label>
        Status:
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="all">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>

      <label>
        Priority:
        <select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
          <option value="all">All</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default TicketFilters;
