const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const studentRoutes = require("./routes/student.routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER || "kyss_superadmin", // Palitan mo ng iyong PostgreSQL username
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "IT 101 Final Project",
  password: process.env.DB_PASSWORD || "5785498", // Palitan mo ng iyong PostgreSQL password
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// Routes
app.use("/api/students", studentRoutes(pool));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
