import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  // Already logged in? No reason to stay on the login page.
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  function handleLogin() {
    login();
    navigate("/dashboard");
  }

  return (
    <section className="login">
      <h1>Login</h1>
      <p>This is a mock login. Click the button to continue.</p>
      <button className="primary" onClick={handleLogin}>
        Log in
      </button>
    </section>
  );
}

export default Login;
