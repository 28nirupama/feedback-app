import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        headers: {
          Authorization:
            "Basic " +
            btoa(`${credentials.username}:${credentials.password}`),
        },
      });

      if (res.status === 401) {
        setStatus("❌ Unauthorized. Invalid username or password.");
        return;
      }

      const data = await res.json();
      setFeedbacks(data);
      setIsLoggedIn(true);
      setStatus("");
    } catch (err) {
      setStatus("❌ Server error while fetching feedback.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFeedbacks([]);
    setCredentials({ username: "", password: "" });
  };

  return (
    <div className="admin-container">
      {!isLoggedIn ? (
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button type="submit">Login</button>
          </form>
          {status && <p className="status">{status}</p>}
        </div>
      ) : (
        <div className="feedback-list">
          <div className="admin-header">
            <h2>Feedback Dashboard</h2>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {feedbacks.length === 0 ? (
            <p>No feedback found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>{fb.id}</td>
                    <td>{fb.name}</td>
                    <td>{fb.email}</td>
                    <td>{fb.rating}</td>
                    <td>{fb.message}</td>
                    <td>{new Date(fb.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
