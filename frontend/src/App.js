import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/" style={{ margin: "10px" }}>Feedback</Link>
        <Link to="/admin" style={{ margin: "10px" }}>Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
