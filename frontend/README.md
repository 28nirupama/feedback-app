# 🚀 User Feedback Application

This is a full-stack application for submitting and viewing user feedback, built with React, Node/Express, and PostgreSQL.

---

## ⚙️ Setup and Installation

Follow these steps to get the application running locally.

### 1. Prerequisites

You must have Node.js and a running instance of PostgreSQL installed.

### 2. Database Setup

1.  Create the database named `feedbackdb` in PostgreSQL:
    ```sql
    CREATE DATABASE feedbackdb;
    ```
2.  Connect to the database and create the `feedback` table:
    ```sql
    \c feedbackdb;

    CREATE TABLE feedback (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 3. Backend Setup (API Server)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    npm install
    ```
2.  Create a `.env` file with your database and authentication credentials:
    ```env
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=feedbackdb
    DB_PASSWORD=postgres
    DB_PORT=5432
    ADMIN_USER=admin
    ADMIN_PASS=1234
    ```
3.  Start the backend server:
    ```bash
    npm start 
    # Server runs on http://localhost:5000
    ```

### 4. Frontend Setup (React App)

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    npm install
    ```
2.  Start the React application:
    ```bash
    npm start 
    # Application runs on http://localhost:3000
    ```

