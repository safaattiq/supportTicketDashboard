import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { ticketReducer, initialTicketState } from "./ticketReducer";
import * as api from "../services/ticketApi";

export const TicketContext = createContext(null);

export function TicketProvider({ children }) {
  // Shared state: the ticket list is needed by the dashboard, the tickets
  // page and the details page, so it lives here.
  const [tickets, dispatch] = useReducer(ticketReducer, initialTicketState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTickets();
      dispatch({ type: "SET_TICKETS", payload: data });
    } catch (err) {
      setError("Unable to load tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs once after the first render. loadTickets never changes (its
  // dependency list is empty), so this effect does not run again.
  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  // These functions call the API and then update the reducer. They rethrow
  // errors so the page that triggered the action can show a message.
  const addTicket = useCallback(async (data) => {
    const created = await api.createTicket(data);
    dispatch({ type: "ADD_TICKET", payload: created });
    return created;
  }, []);

  const removeTicket = useCallback(async (id) => {
    await api.deleteTicket(id);
    dispatch({ type: "DELETE_TICKET", payload: id });
  }, []);

  const changeStatus = useCallback(async (id, status) => {
    const updated = await api.updateTicket(id, { status });
    dispatch({ type: "UPDATE_TICKET", payload: updated });
    return updated;
  }, []);

  // useMemo keeps the context value the same object until something in it
  // really changes, so consumers are not re-rendered for no reason.
  const value = useMemo(
    () => ({
      tickets,
      loading,
      error,
      loadTickets,
      addTicket,
      removeTicket,
      changeStatus,
    }),
    [tickets, loading, error, loadTickets, addTicket, removeTicket, changeStatus]
  );

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}
