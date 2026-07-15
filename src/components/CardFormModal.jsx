import { useState } from "react";

const emptyForm = { id: "", name: "", dept: "", issue: "", expiry: "", contact: "", username: "" };

export default function CardFormModal({ initial, existingIds, onSubmit, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(initial ? { ...initial } : emptyForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.id || !form.name || !form.dept || !form.issue || !form.expiry) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!isEdit && existingIds.includes(form.id)) {
      setError(`Card ID "${form.id}" already exists.`);
      return;
    }
    if (new Date(form.expiry) < new Date(form.issue)) {
      setError("Expiry date must be after the issue date.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit Card" : "Add New Card"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Card ID</label>
            <input id="id" name="id" value={form.id} onChange={handleChange} disabled={isEdit} placeholder="SC-004" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Employee name" />
          </div>
          <div className="form-group">
            <label htmlFor="dept">Department</label>
            <input id="dept" name="dept" value={form.dept} onChange={handleChange} placeholder="IT, HR, Security..." />
          </div>
          <div className="form-group">
            <label htmlFor="issue">Issue Date</label>
            <input id="issue" name="issue" type="date" value={form.issue} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input id="expiry" name="expiry" type="date" value={form.expiry} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Email</label>
            <input id="contact" name="contact" type="email" value={form.contact} onChange={handleChange} placeholder="name@company.com" />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save Changes" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
