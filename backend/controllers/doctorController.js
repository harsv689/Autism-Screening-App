const Doctor = require('../models/Doctor');

exports.addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add doctor' });
  }
};
