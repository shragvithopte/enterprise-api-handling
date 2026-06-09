import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

function Login() {
  const navigate = useNavigate();
  const notify = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);

      notify.success("Login Successful");

      navigate("/dashboard");
    } catch {
      notify.error("Invalid Credentials");
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h1>Enterprise API Handling</h1>

      <p>Login to continue</p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Demo Credentials:
        <br />
        admin@test.com
        <br />
        admin123
      </p>
    </div>
  </div>
);
}

export default Login;