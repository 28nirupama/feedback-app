const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

// ✅ Single POST route
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Validation
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const result = await pool.query(
      "INSERT INTO feedback (name, email, rating, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, rating, message]
    );

    res.status(201).json({ message: "Feedback submitted successfully", feedback: result.rows[0] });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET route (protected)
app.get("/api/feedback", async (req, res) => {
  const auth = req.headers.authorization;
  const expectedAuth = "Basic " + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString("base64");

  if (auth !== expectedAuth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
