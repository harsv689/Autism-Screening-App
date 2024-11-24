const Camp = require('../models/Camp');

exports.scheduleCamp = async (req, res) => {
  try {
    if (req.body.studentsRegistered === undefined) {
      req.body.studentsRegistered = 0;  
    }
    if (req.body.studentsPositive === undefined) {
      req.body.studentsPositive = 0;
    }
    if (req.body.studentsScreened === undefined) {
      req.body.studentsScreened = 0;
    }
    if (req.body.status === undefined) {
      req.body.status = "upcoming";
    }
    const newCamp = new Camp(req.body);
    await newCamp.save();
    res.status(201).json({ message: 'Camp scheduled successfully' , camp: newCamp});
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule camp' });
  }
};
