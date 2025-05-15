// backend/models/student.model.js
const { Pool } = require("pg");
const dbConfig = require("../config/db.config");

const pool = new Pool(dbConfig);

module.exports = {
  async create(studentData) {
    const { student_id, first_name, last_name } = studentData;
    const query =
      "INSERT INTO students (student_id, first_name, last_name) VALUES ($1, $2, $3) RETURNING *";
    const values = [student_id, first_name, last_name];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },

  async findByStudentId(studentId) {
    const query = "SELECT * FROM students WHERE student_id = $1";
    const values = [studentId];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding student:", error);
      throw error;
    }
  },

  async logSignIn(studentId) {
    const query =
      "INSERT INTO sign_in_logs (student_id, sign_in_time) VALUES ($1, NOW())";
    const values = [studentId];
    try {
      await pool.query(query, values);
    } catch (error) {
      console.error("Error logging sign-in:", error);
      throw error;
    }
  },
};

// Tandaan: Kailangan mo munang i-create ang mga table na 'students' at 'sign_in_logs' sa iyong PostgreSQL database.
// Halimbawa ng SQL para sa paggawa ng mga table:
