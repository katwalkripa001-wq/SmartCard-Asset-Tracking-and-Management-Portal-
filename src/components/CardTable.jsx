import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";
import { getCardStatus } from "../utils/cardStatus";

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "dept", label: "Dept" },
  { key: "issue", label: "Issue" },
  { key: "expiry", label: "Expiry" },
];

export default function CardTable({ cards, onEdit, onDelete, highlightId }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let rows = cards.filter((c) => {
      const matchesQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.dept.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || getCardStatus(c.expiry) === statusFilter;
      return matchesQuery && matchesStatus;
    });

    rows = [...rows].sort((a, b) => {
      const va = a[sortKey] ?? "";
      const vb = b[sortKey] ?? "";
      const cmp = String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [cards, query, statusFilter, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const showActions = Boolean(onEdit || onDelete);

  return (
    <div>
      <div className="table-toolbar">
        <input
          type="text"
          className="table-search"
          placeholder="Search by ID, name, or department..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search card records"
        />
        <select
          className="table-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active only</option>
          <option value="Expired">Expired only</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} className="sortable-th" onClick={() => toggleSort(col.key)}>
                  {col.label}
                  {sortKey === col.key && <span className="sort-arrow">{sortDir === "asc" ? " ▲" : " ▼"}</span>}
                </th>
              ))}
              <th>Status</th>
              {showActions && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="table-empty">
                  No matching card records.
                </td>
              </tr>
            )}
            {filtered.map((card) => (
              <tr key={card.id} className={card.id === highlightId ? "row-highlight" : ""}>
                <td>{card.id}</td>
                <td>{card.name}</td>
                <td>{card.dept}</td>
                <td>{card.issue}</td>
                <td>{card.expiry}</td>
                <td>
                  <StatusBadge status={getCardStatus(card.expiry)} />
                </td>
                {showActions && (
                  <td>
                    {onEdit && (
                      <button className="btn-edit" onClick={() => onEdit(card)}>
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button className="btn-delete" onClick={() => onDelete(card.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-count">
        Showing {filtered.length} of {cards.length} records
      </p>
    </div>
  );
}