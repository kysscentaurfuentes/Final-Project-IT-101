const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // Endpoint para mag-scan ng QR code at mag-sign in
  router.post("/signin", async (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required." });
    }

    try {
      const now = new Date();
      const result = await pool.query(
        "INSERT INTO signin_logs (student_id, signin_time) VALUES ($1, $2) RETURNING *",
        [studentId, now]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ error: "Failed to sign in student." });
    }
  });

  // Endpoint para makuha ang lahat ng sign-in logs (para sa admin/monitoring)
  router.get("/logs", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM signin_logs ORDER BY signin_time DESC"
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching sign-in logs:", error);
      res.status(500).json({ error: "Failed to fetch sign-in logs." });
    }
  });

  return router;
};
