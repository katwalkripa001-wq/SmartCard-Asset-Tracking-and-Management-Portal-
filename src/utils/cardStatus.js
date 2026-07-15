// The original data set stored "status" as a hardcoded string, so a card
// would keep saying "Active" forever even after its expiry date passed.
// Deriving status from the expiry date keeps it correct automatically.
export function getCardStatus(expiry) {
  if (!expiry) return "Unknown";
  const expiryDate = new Date(expiry);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(expiryDate.getTime())) return "Unknown";
  return expiryDate < today ? "Expired" : "Active";
}

export function daysUntilExpiry(expiry) {
  const expiryDate = new Date(expiry);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = expiryDate.setHours(0, 0, 0, 0) - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
