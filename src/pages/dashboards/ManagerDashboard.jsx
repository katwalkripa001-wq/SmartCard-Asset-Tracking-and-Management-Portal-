import { useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCards } from "../../context/CardsContext";
import { useToast } from "../../context/ToastContext";
import CardTable from "../../components/CardTable";

export default function ManagerDashboard() {
  const { user } = useAuth();
  const { cards } = useCards();
  const { showToast } = useToast();

  useEffect(() => {
    showToast(`Welcome ${user.username} (Manager)`, "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deptCounts = useMemo(() => {
    const counts = {};
    cards.forEach((c) => {
      counts[c.dept] = (counts[c.dept] || 0) + 1;
    });
    return counts;
  }, [cards]);

  const maxCount = Math.max(1, ...Object.values(deptCounts));

  return (
    <div className="dashboard">
      <h1>Manager Dashboard</h1>

      <section className="team-overview">
        <h2>Team Overview by Department</h2>
        <div className="dept-bars">
          {Object.entries(deptCounts).map(([dept, count]) => (
            <div className="dept-bar-row" key={dept}>
              <span className="dept-bar-label">{dept}</span>
              <div className="dept-bar-track">
                <div className="dept-bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} />
              </div>
              <span className="dept-bar-count">{count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="records">
        <h2>Card Records</h2>
        <CardTable cards={cards} />
      </section>
    </div>
  );
}
