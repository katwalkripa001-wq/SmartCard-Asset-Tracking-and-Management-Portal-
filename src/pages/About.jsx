import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

const objectives = [
  {
    title: "Centralized Management",
    text: "All card data in one secure, accessible location for administrators and managers across departments.",
  },
  {
    title: "Fast Searching",
    text: "Instantly locate card records by ID, holder name, department, or current status.",
  },
  {
    title: "Real-Time Tracking",
    text: "Monitor active, expired, and lost cards with live status updates and audit logs.",
  },
  {
    title: "Reports & Analytics",
    text: "Generate detailed reports and export data for audit trails and informed decision-making.",
  },
];

const roles = [
  { role: "Super Admin", level: "Full", badge: "badge-red", perms: "All system access, user management, system configuration" },
  { role: "Admin", level: "High", badge: "badge-amber", perms: "Card management, reports, role assignment" },
  { role: "Manager", level: "Medium", badge: "badge-blue", perms: "View & update card status, generate department reports" },
  { role: "HR Officer", level: "Medium", badge: "badge-blue", perms: "Issue new cards, update cardholder information" },
  { role: "Security", level: "Limited", badge: "badge-green", perms: "Verify card status, flag lost or suspicious cards" },
  { role: "Employee", level: "Limited", badge: "badge-green", perms: "View own card details and request updates" },
];

export default function About() {
  const { showToast } = useToast();

  useEffect(() => {
    showToast("Viewing About SmartCard Portal", "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="about-hero">
        <div className="container">
          <h1>About SmartCard Portal</h1>
          <p>
            A centralized platform for managing smart card assets across schools, banks,
            offices, and organizations — built for efficiency, security, and clarity. Our
            system streamlines card issuance, tracking, and reporting, ensuring that
            administrators and managers have the tools they need to oversee card operations
            effectively.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="section-title">
          <h2>Our Objectives</h2>
          <div className="section-divider" />
        </div>

        <div className="objectives-grid">
          {objectives.map((o) => (
            <div className="objective-card" key={o.title}>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          ))}
        </div>

        <div className="mission-card">
          <div>
            <h2>Our Mission</h2>
            <p>
              To provide an innovative and reliable smart card management platform that
              streamlines asset tracking, enhances operational security, and empowers
              organizations with the tools they need to manage their workforce efficiently
              and transparently.
            </p>
          </div>
        </div>

        <div className="section-title">
          <h2>System Roles &amp; Access</h2>
          <div className="section-divider" />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Access Level</th>
                <th>Key Permissions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.role}>
                  <td>
                    <strong>{r.role}</strong>
                  </td>
                  <td>
                    <span className={`badge ${r.badge}`}>{r.level}</span>
                  </td>
                  <td>{r.perms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
