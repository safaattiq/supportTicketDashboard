import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicket } from "../hooks/useTicket";
import { useTickets } from "../hooks/useTickets";
import { STATUSES, STATUS_LABELS, PRIORITY_LABELS } from "../constants";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function TicketDetails() {
  // The :id from the URL decides which ticket is shown.
  const { id } = useParams();
  const navigate = useNavigate();

  const { ticket, setTicket, loading, error } = useTicket(id);
  const { changeStatus } = useTickets();

  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function handleStatusChange(e) {
    setSaving(true);
    setActionError(null);
    try {
      // Updates the "server" and the shared context, then this page's copy.
      const updated = await changeStatus(ticket.id, e.target.value);
      setTicket(updated);
    } catch (err) {
      setActionError("Unable to update the status. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader message="Loading ticket..." />;

  if (error) {
    return (
      <section>
        <ErrorMessage message={error} />
        <button onClick={() => navigate("/tickets")}>Back to tickets</button>
      </section>
    );
  }

  return (
    <section className="details">
      <h1>{ticket.title}</h1>

      <dl>
        <dt>Description</dt>
        <dd>{ticket.description}</dd>

        <dt>Status</dt>
        <dd>
          <span className={`badge status-${ticket.status}`}>
            {STATUS_LABELS[ticket.status]}
          </span>
        </dd>

        <dt>Priority</dt>
        <dd>
          <span className={`badge priority-${ticket.priority}`}>
            {PRIORITY_LABELS[ticket.priority]}
          </span>
        </dd>

        <dt>Category</dt>
        <dd>{ticket.category}</dd>
      </dl>

      <label className="status-change">
        Change status:
        <select value={ticket.status} onChange={handleStatusChange} disabled={saving}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>
      {saving && <span> Saving...</span>}

      {actionError && <ErrorMessage message={actionError} />}

      <div className="ticket-actions">
        <button onClick={() => navigate("/tickets")}>Back to tickets</button>
      </div>
    </section>
  );
}

export default TicketDetails;
