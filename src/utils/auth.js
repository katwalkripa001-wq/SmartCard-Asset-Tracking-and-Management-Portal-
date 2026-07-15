// Demo-only credentials. In a real system this check happens on a server,
// never in client-side JS.
export const CREDENTIALS = {
  admin: { user: "admin", pass: "admin123", label: "Super Admin" },
  manager: { user: "manager", pass: "manager123", label: "Manager" },
  hr: { user: "hr", pass: "hr123", label: "HR Officer" },
  security: { user: "security", pass: "security123", label: "Security" },
  employee: { user: "employee", pass: "emp123", label: "Employee" },
};

export const ROLE_HOME = {
  admin: "/dashboard/admin",
  manager: "/dashboard/manager",
  hr: "/dashboard/hr",
  security: "/dashboard/security",
  employee: "/dashboard/employee",
};

export function attemptLogin(username, password, role) {
  const cred = CREDENTIALS[role];
  if (cred && username === cred.user && password === cred.pass) {
    return { username, role, label: cred.label };
  }
  return null;
}
