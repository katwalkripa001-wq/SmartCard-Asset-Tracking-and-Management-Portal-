import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCards } from "../context/CardsContext";
import { useToast } from "../context/ToastContext";
import { getCardStatus } from "../utils/cardStatus";
import StatCard from "../components/StatCard";

export default function Home() {
  const { cards } = useCards();
  const { showToast } = useToast();

  useEffect(() => {
    showToast("Welcome to Smart Card Portal", "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCount = cards.filter((c) => getCardStatus(c.expiry) === "Active").length;
  const expiredCount = cards.filter((c) => getCardStatus(c.expiry) === "Expired").length;

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="pulse" /> System Active — v2.0
          </div>

          <h1>
            Smart Card Asset
            <br />
            <span className="accent">Tracking &amp; Management</span>
            <br />
            Portal
          </h1>

          <p className="lead">
            Centralized, secure, and efficient management of smart card assets for schools,
            banks, offices, and organizations.
          </p>

          <div className="hero-pills">
            <div className="pill">
              <span className="dot" /> Centralized Control
            </div>
            <div className="pill">
              <span className="dot" /> Role-Based Access
            </div>
            <div className="pill">
              <span className="dot" /> Real-Time Tracking
            </div>
            <div className="pill">
              <span className="dot" /> Reports &amp; Analytics
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              View Dashboard →
            </Link>
            <Link to="/about" className="btn btn-outline-white">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="home-stats-section">
        <div id="home-stats" className="home-stats">
          <StatCard icon="📊" value={activeCount} label="Active Cards" color="blue" />
          <StatCard icon="⏳" value={expiredCount} label="Expired Cards" color="red" />
        </div>
      </section>
    </>
  );
}
