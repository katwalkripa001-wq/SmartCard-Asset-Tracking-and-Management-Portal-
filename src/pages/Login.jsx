import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLE_HOME } from "../utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null); // { type, text }
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !role) {
      setMessage({ type: "error", text: "⚠️ Please fill in all fields." });
      return;
    }

    const result = login(username.trim(), password.trim(), role);
    if (result) {
      setMessage({ type: "success", text: "✅ Login successful! Redirecting..." });
      setTimeout(() => navigate(ROLE_HOME[result.role]), 800);
    } else {
      setMessage({ type: "error", text: "❌ Incorrect credentials. Please try again." });
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-header">
          <h2>WELCOME BACK!</h2>
          <p>Sign in to access the SmartCard Portal.</p>
        </div>

        <div className="login-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select your role</option>
                <option value="admin">Super Admin</option>
                <option value="manager">Manager</option>
                <option value="hr">HR Officer</option>
                <option value="security">Security</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
            >
              Sign In →
            </button>

            {message && (
              <div className={`alert alert-${message.type}`} style={{ marginTop: 14 }}>
                {message.text}
              </div>
            )}
          </form>

          <p style={{ marginTop: 20, fontSize: "0.9em", color: "#666" }}>
            Don't have an account? Contact your administrator to get access.
          </p>
        </div>
      </div>
    </div>
  );
}
