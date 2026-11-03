import TicketCard from "./TicketCard";

function TicketList({ tickets, onDelete }) {
  return (
    <ul className="ticket-list">
      {/* ticket.id is unique and never changes, so React can track each card
          correctly when items are added, removed or filtered. */}
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TicketList;
