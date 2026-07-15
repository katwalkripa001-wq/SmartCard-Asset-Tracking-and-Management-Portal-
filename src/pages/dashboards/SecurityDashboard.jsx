import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCards } from "../../context/CardsContext";
import { useToast } from "../../context/ToastContext";
import CardTable from "../../components/CardTable";

export default function SecurityDashboard() {
  const { user } = useAuth();
  const { cards, logs, addLog } = useCards();
  const { showToast } = useToast();
  const [cardId, setCardId] = useState("");
  const [action, setAction] = useState("Entry");

  useEffect(() => {
    showToast(`Welcome ${user.username} (Security)`, "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogSubmit(e) {
    e.preventDefault();
    if (!cardId) {
      showToast("Select a card before logging", "error");
      return;
    }
    const entry = {
      id: `LOG-${String(logs.length + 1).padStart(3, "0")}`,
      card: cardId,
      action,
      time: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    addLog(entry);
    showToast(`Logged ${action} for ${cardId}`, "success");
    setCardId("");
  }

  return (
    <div className="dashboard">
      <h1>Security Dashboard</h1>

      <section className="records">
        <h2>Card Records</h2>
        <CardTable cards={cards} />
      </section>

      <section className="access-logs">
        <h2>Access Logs</h2>

        <form className="log-form" onSubmit={handleLogSubmit}>
          <select value={cardId} onChange={(e) => setCardId(e.target.value)} aria-label="Card ID">
            <option value="">Select card...</option>
            {cards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.name}
              </option>
            ))}
          </select>
          <select value={action} onChange={(e) => setAction(e.target.value)} aria-label="Action">
            <option value="Entry">Entry</option>
            <option value="Exit">Exit</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Log Access
          </button>
        </form>

        <ul id="logs-list">
          {logs.map((l) => (
            <li key={l.id}>
              {l.card} — {l.action} at {l.time}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
