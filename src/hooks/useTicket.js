import { useEffect, useState } from "react";
import { getTicketById } from "../services/ticketApi";

// Fetches a single ticket and re-fetches whenever the id changes
// (for example when moving from /tickets/1 to /tickets/2).
export function useTicket(id) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // "ignore" stops an old, slower request from overwriting the state of
    // a newer one, and from updating state after the component is gone.
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTicketById(id);
        if (!ignore) setTicket(data);
      } catch (err) {
        if (!ignore) {
          setTicket(null);
          setError(
            err.message === "Ticket not found"
              ? "Ticket not found."
              : "Unable to load this ticket."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { ticket, setTicket, loading, error };
}
