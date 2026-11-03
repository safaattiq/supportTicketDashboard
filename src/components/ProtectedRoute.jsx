import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Used as a layout route: if the user is logged in the child routes are
// rendered through <Outlet />, otherwise they are sent to /login.
function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
