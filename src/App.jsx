import { Navigate, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";

function NotFound() {
  return (
    <main className="container">
      <h1>Page not found</h1>
      <Link to="/dashboard">Go to dashboard</Link>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
