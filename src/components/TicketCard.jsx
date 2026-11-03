import { memo } from "react";
import { Link } from "react-router-dom";
import { STATUS_LABELS, PRIORITY_LABELS } from "../constants";

// React.memo: skip re-rendering when the props are the same as last time.
// This only works if `ticket` and `onDelete` keep the same reference, which
// is why the parent wraps onDelete in useCallback.
const TicketCard = memo(function TicketCard({ ticket, onDelete }) {
  return (
    <li className="ticket-card">
      <h3>{ticket.title}</h3>

      <p className="ticket-meta">
        <span className={`badge priority-${ticket.priority}`}>
          {PRIORITY_LABELS[ticket.priority]}
        </span>
        <span className={`badge status-${ticket.status}`}>
          {STATUS_LABELS[ticket.status]}
        </span>
        <span className="badge category">{ticket.category}</span>
      </p>

      {ticket.status === "resolved" && (
        <p className="resolved-note">This ticket has been resolved.</p>
      )}

      <div className="ticket-actions">
        <Link className="button" to={`/tickets/${ticket.id}`}>
          View
        </Link>
        <button className="danger" onClick={() => onDelete(ticket.id)}>
          Delete
        </button>
      </div>
    </li>
  );
});

export default TicketCard;
