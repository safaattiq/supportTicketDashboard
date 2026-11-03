import { useTickets } from "../hooks/useTickets";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Dashboard() {
  // stats are derived from the tickets inside useTickets, so they can never
  // get out of sync with the list.
  const { stats, loading, error, loadTickets } = useTickets();

  if (loading) return <Loader message="Loading tickets..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadTickets} />;

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="stats">
        <StatCard label="Total Tickets" value={stats.total} />
        <StatCard label="Open Tickets" value={stats.open} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Resolved" value={stats.resolved} />
        <StatCard label="High Priority Tickets" value={stats.highPriority} />
      </div>
    </section>
  );
}

export default Dashboard;
