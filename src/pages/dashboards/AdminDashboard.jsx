import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCards } from "../../context/CardsContext";
import { useToast } from "../../context/ToastContext";
import { getCardStatus } from "../../utils/cardStatus";
import CardTable from "../../components/CardTable";
import CardFormModal from "../../components/CardFormModal";
import StatCard from "../../components/StatCard";
import StatusPieChart from "../../components/StatusPieChart";
import { exportCardsToCSV } from "../../utils/exportCsv";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { cards, addCard, updateCard, deleteCard } = useCards();
  const { showToast } = useToast();
  const [modalState, setModalState] = useState(null); // null | { mode: "add" | "edit", card? }

  useEffect(() => {
    showToast(`Welcome ${user.username} (Admin)`, "success");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCount = cards.filter((c) => getCardStatus(c.expiry) === "Active").length;
  const expiredCount = cards.filter((c) => getCardStatus(c.expiry) === "Expired").length;

  function handleAdd(formData) {
    addCard(formData);
    showToast(`Card ${formData.id} added`, "success");
    setModalState(null);
  }

  function handleEditSave(formData) {
    updateCard(formData.id, formData);
    showToast(`Card ${formData.id} updated`, "success");
    setModalState(null);
  }

  function handleDelete(id) {
    if (!window.confirm(`Delete card ${id}? This cannot be undone.`)) return;
    deleteCard(id);
    showToast("Card deleted", "error");
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-header-actions">
          <button className="btn btn-outline" onClick={() => exportCardsToCSV(cards, "scms-card-records.csv")}>
            ⬇ Export CSV
          </button>
          <button className="btn btn-primary" onClick={() => setModalState({ mode: "add" })}>
            + Add Card
          </button>
        </div>
      </div>

      <section className="stats">
        <h2>System Stats</h2>
        <div className="stats-layout">
          <div className="stat-row">
            <StatCard icon="🗂️" value={cards.length} label="Total Cards" color="blue" />
            <StatCard icon="✅" value={activeCount} label="Active" color="blue" />
            <StatCard icon="⏳" value={expiredCount} label="Expired" color="red" />
          </div>
          <StatusPieChart active={activeCount} expired={expiredCount} />
        </div>
      </section>

      <section className="records">
        <h2>Card Records</h2>
        <CardTable
          cards={cards}
          onEdit={(card) => setModalState({ mode: "edit", card })}
          onDelete={handleDelete}
        />
      </section>

      {modalState && (
        <CardFormModal
          initial={modalState.mode === "edit" ? modalState.card : null}
          existingIds={cards.map((c) => c.id)}
          onSubmit={modalState.mode === "edit" ? handleEditSave : handleAdd}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}