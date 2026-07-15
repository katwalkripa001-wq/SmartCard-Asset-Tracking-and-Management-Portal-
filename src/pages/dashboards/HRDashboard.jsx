import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCards } from "../../context/CardsContext";
import { useToast } from "../../context/ToastContext";
import { getCardStatus } from "../../utils/cardStatus";
import { exportCardsToCSV } from "../../utils/exportCsv";
import CardTable from "../../components/CardTable";
import StatCard from "../../components/StatCard";
import StatusPieChart from "../../components/StatusPieChart";

export default function HRDashboard() {
  const { user } = useAuth();
  const { cards } = useCards();
  const { showToast } = useToast();

  useEffect(() => {
    showToast(`Welcome ${user.username} (HR Officer)`, "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCount = cards.filter((c) => getCardStatus(c.expiry) === "Active").length;
  const expiredCount = cards.filter((c) => getCardStatus(c.expiry) === "Expired").length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>HR Dashboard</h1>
        <button className="btn btn-outline" onClick={() => exportCardsToCSV(cards, "scms-card-records.csv")}>
          ⬇ Export CSV
        </button>
      </div>

      <section className="stats">
        <h2>Reports</h2>
        <div className="stats-layout">
          <div className="stat-row">
            <StatCard icon="✅" value={activeCount} label="Active Cards" color="blue" />
            <StatCard icon="⏳" value={expiredCount} label="Expired Cards" color="red" />
          </div>
          <StatusPieChart active={activeCount} expired={expiredCount} />
        </div>
      </section>

      <section className="records">
        <h2>Card Records</h2>
        <CardTable cards={cards} />
      </section>
    </div>
  );
}