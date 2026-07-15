export default function StatusBadge({ status }) {
  const cls = status === "Active" ? "badge badge-active" : "badge badge-expired";
  return <span className={cls}>{status}</span>;
}
