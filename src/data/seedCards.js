// Initial demo data. Loaded into localStorage on first run only —
// after that, CardsContext takes over as the single source of truth.
export const seedCards = [
  {
    id: "SC-001",
    name: "Ram Shrestha",
    dept: "IT",
    issue: "2025-01-01",
    expiry: "2027-01-01",
    contact: "ram@company.com",
    username: "employee", // links this card to the demo employee login
  },
  {
    id: "SC-002",
    name: "Sita Karki",
    dept: "HR",
    issue: "2025-02-01",
    expiry: "2026-02-01",
    contact: "sita@company.com",
    username: "",
  },
  {
    id: "SC-003",
    name: "Bikash Gurung",
    dept: "Security",
    issue: "2024-06-01",
    expiry: "2025-06-01",
    contact: "bikash@company.com",
    username: "",
  },
];

export const seedLogs = [
  { id: "LOG-001", card: "SC-001", action: "Entry", time: "2026-07-13 09:00" },
  { id: "LOG-002", card: "SC-002", action: "Exit", time: "2026-07-13 09:30" },
];
