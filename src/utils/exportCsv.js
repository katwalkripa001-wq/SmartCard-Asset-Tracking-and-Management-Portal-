// Simple client-side CSV export — no backend needed.
export function exportCardsToCSV(cards, filename = "card-records.csv") {
  const headers = ["ID", "Name", "Department", "Issue Date", "Expiry Date", "Contact"];
  const rows = cards.map((c) => [c.id, c.name, c.dept, c.issue, c.expiry, c.contact || ""]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}