// backend/controllers/student.controller.js
const Student = require("../models/student.model");

exports.signIn = async (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).send({ message: "Student ID is required!" });
  }

  try {
    const student = await Student.findByStudentId(student_id);
    if (!student) {
      return res
        .status(404)
        .send({ message: `Student with ID ${student_id} not found!` });
    }

    await Student.logSignIn(student_id);
    res.send({
      message: `Student ${student.first_name} ${student.last_name} signed in successfully!`,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send({ message: "Error processing sign-in." });
  }
};

exports.registerStudent = async (req, res) => {
  const { student_id, first_name, last_name } = req.body;

  if (!student_id || !first_name || !last_name) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const existingStudent = await Student.findByStudentId(student_id);
    if (existingStudent) {
      return res
        .status(409)
        .send({ message: `Student with ID ${student_id} already exists!` });
    }

    const newStudent = await Student.create({
      student_id,
      first_name,
      last_name,
    });
    res
      .status(201)
      .send({
        message: "Student registered successfully!",
        student: newStudent,
      });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).send({ message: "Error registering student." });
  }
};
