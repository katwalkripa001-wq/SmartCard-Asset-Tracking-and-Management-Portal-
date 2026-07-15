import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCards } from "../../context/CardsContext";
import { useToast } from "../../context/ToastContext";
import { getCardStatus } from "../../utils/cardStatus";
import StatusBadge from "../../components/StatusBadge";
import CardTable from "../../components/CardTable";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { cards } = useCards();
  const { showToast } = useToast();

  useEffect(() => {
    showToast(`Welcome ${user.username} (Employee)`, "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myCard = cards.find((c) => c.username === user.username);

  return (
    <div className="dashboard">
      <h1>Employee Dashboard</h1>

      <section className="my-card">
        <h2>My Card</h2>
        {myCard ? (
          <div className="my-card-details">
            <p>
              <strong>Card ID:</strong> {myCard.id}
            </p>
            <p>
              <strong>Name:</strong> {myCard.name}
            </p>
            <p>
              <strong>Department:</strong> {myCard.dept}
            </p>
            <p>
              <strong>Expiry:</strong> {myCard.expiry}
            </p>
            <p>
              <strong>Status:</strong> <StatusBadge status={getCardStatus(myCard.expiry)} />
            </p>
          </div>
        ) : (
          <p>No card record found for your account.</p>
        )}
      </section>

      <section className="records">
        <h2>Card Records</h2>
        <CardTable cards={cards} highlightId={myCard?.id} />
      </section>
    </div>
  );
}
