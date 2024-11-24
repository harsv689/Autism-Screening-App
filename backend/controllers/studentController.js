const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student' });
  }
};
