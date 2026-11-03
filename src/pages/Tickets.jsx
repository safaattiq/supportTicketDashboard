import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import TicketFilters from "../components/TicketFilters";
import TicketList from "../components/TicketList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Tickets() {
  const { tickets, loading, error, loadTickets, removeTicket } = useTickets();

  // Local state: only this page cares about what the user typed or selected.
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [actionError, setActionError] = useState(null);

  // Derived data, not state. Recomputed only when tickets or a filter changes.
  // For a handful of tickets this is not needed for speed; it is here to
  // practise useMemo. The filter is cheap, so removing it would be fine too.
  const filteredTickets = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = ticket.title.toLowerCase().includes(term);
      const matchesStatus = status === "all" || ticket.status === status;
      const matchesPriority = priority === "all" || ticket.priority === priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, status, priority]);

  // Every render creates a new function object. Without useCallback the
  // memoized TicketCards would get a "new" onDelete each time the user types
  // in the search box and would all re-render. removeTicket is stable, so
  // handleDelete is stable too.
  const handleDelete = useCallback(
    async (id) => {
      setActionError(null);
      try {
        await removeTicket(id);
      } catch (err) {
        setActionError("Unable to delete the ticket. Please try again.");
      }
    },
    [removeTicket]
  );

  let content;
  if (loading) {
    content = <Loader message="Loading tickets..." />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={loadTickets} />;
  } else if (filteredTickets.length === 0) {
    content = <p className="empty">No tickets found.</p>;
  } else {
    content = <TicketList tickets={filteredTickets} onDelete={handleDelete} />;
  }

  return (
    <section>
      <div className="page-header">
        <h1>Tickets</h1>
        <Link className="button primary" to="/tickets/new">
          New Ticket
        </Link>
      </div>

      <TicketFilters
        search={search}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {actionError && <ErrorMessage message={actionError} />}

      {content}
    </section>
  );
}

export default Tickets;
