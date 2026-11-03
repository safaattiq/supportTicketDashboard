import { useContext, useMemo } from "react";
import { TicketContext } from "../context/TicketContext";

// Gives components access to the shared ticket state plus the statistics
// derived from it. Stats are calculated from the tickets, not stored.
export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used inside a TicketProvider");
  }

  const { tickets } = context;

  const stats = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in-progress").length,
      resolved: tickets.filter((t) => t.status === "resolved").length,
      highPriority: tickets.filter((t) => t.priority === "high").length,
    }),
    [tickets]
  );

  return { ...context, stats };
}
