import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <span className="brand">Support Desk</span>
      <div className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/tickets" end>
          Tickets
        </NavLink>
        <NavLink to="/tickets/new">New Ticket</NavLink>
      </div>
      <button onClick={handleLogout}>Log out</button>
    </nav>
  );
}

export default Navbar;
