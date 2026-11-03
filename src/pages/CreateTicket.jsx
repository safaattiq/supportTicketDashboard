import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import TicketForm from "../components/TicketForm";

function CreateTicket() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await addTicket(data);
      // Navigation happens because of logic (a successful save), not because
      // the user clicked a link, so useNavigate is the right tool.
      navigate("/tickets");
    } catch (err) {
      setSubmitError("Unable to create the ticket. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Create Ticket</h1>
      <TicketForm
        onSubmit={handleSubmit}
        submitting={submitting}
        submitError={submitError}
      />
    </section>
  );
}

export default CreateTicket;
