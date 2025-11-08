import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Feedback submitted successfully!");
        setFormData({ name: "", email: "", rating: 5, message: "" });
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-header">
        <h2>Hi {formData.name || "there"}, how can we help?</h2>
        <button className="close-btn">✕</button>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      
        <div className="input-group">
          <label>Leave us your comment</label>
          <textarea
            name="message"
            placeholder="Your feedback message (max 500 characters)"
            maxLength="500"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="input-group">
          <label>Rating (1–5)</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>

        {status && <p className="status">{status}</p>}
      </form>

      <div className="feedback-footer">
        <button className="active">Feedback</button>
        <button>Ideas</button>
        <button>Roadmap</button>
        <button>News</button>
      </div>
    </div>
  );
};

export default FeedbackForm;
