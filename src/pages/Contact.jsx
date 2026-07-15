import { useState } from "react";

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [feedback, setFeedback] = useState(null); // { type, text }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      setFeedback({ type: "error", text: "⚠️ Please fill in all fields." });
      return;
    }
    if (!emailRegex.test(email)) {
      setFeedback({ type: "error", text: "❌ Invalid email address." });
      return;
    }

    setFeedback({ type: "success", text: "✅ Message sent successfully! We'll get back to you soon." });
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have a question or need support? We're here to help.</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Reach out to our support team for any queries related to the SmartCard Portal system.</p>

            <div className="info-item">
              <div>
                <strong>Location</strong>
                <span> Kathmandu, Nepal</span>
              </div>
            </div>
            <div className="info-item">
              <div>
                <strong>Email</strong>
                <span>support@smartcardportal.edu.np</span>
              </div>
            </div>
            <div className="info-item">
              <div>
                <strong>Phone</strong>
                <span>+977-01-4XXXXXX</span>
              </div>
            </div>
            <div className="info-item">
              <div>
                <strong>Office Hours</strong>
                <span>Sun–Fri, 9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Send Message →
              </button>

              {feedback && (
                <div className={`alert alert-${feedback.type}`} style={{ marginTop: 14 }}>
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
