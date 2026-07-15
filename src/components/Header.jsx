import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <div className="logo">SCMS{user ? ` — ${user.label}` : ""}</div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
        {user ? (
          <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            Logout
          </a>
        ) : (
          <NavLink to="/login" className="nav-cta">
            Login →
          </NavLink>
        )}
      </nav>
    </header>
  );
}
