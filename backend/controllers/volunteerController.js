const Volunteer = require('../models/Volunteer');

exports.addVolunteer = async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
   
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add volunteer' });
  }
};
