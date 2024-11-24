const Screening = require('../models/Screening'); // Adjust the path as per your folder structure
const Doctor = require('../models/Doctor');
const Volunteer = require('../models/Volunteer');
const Student = require('../models/Student');
const Camp = require('../models/Camp');

// Function to add a new screening
// const addScreening = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { doctor, volunteer, student, camp, report } = req.body;

//     if (!volunteer || !student || !camp) {
//       return res.status(400).json({ message: 'Volunteer, Student, and Camp are required.' });
//     }

//     if (doctor) {
//       const doctorExists = await Doctor.findById(doctor);
//       if (!doctorExists) {
//         return res.status(404).json({ message: 'Doctor not found.' });
//       }
//     }

//     const volunteerExists = await Volunteer.findById(volunteer);
//     if (!volunteerExists) {
//       return res.status(404).json({ message: 'Volunteer not found.' });
//     }

//     const studentExists = await Student.findById(student);
//     if (!studentExists) {
//       return res.status(404).json({ message: 'Student not found.' });
//     }

//     const campExists = await Camp.findById(camp);
//     if (!campExists) {
//       return res.status(404).json({ message: 'Camp not found.' });
//     }

//     const newScreening = new Screening({
//       doctor,
//       volunteer,
//       student,
//       camp,
//       report,
//     });

//     const savedScreening = await newScreening.save();
//     res.status(201).json({ message: 'Screening added successfully!', screening: savedScreening });
//   } catch (error) {
//     console.error('Error adding screening:', error.message);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

const addScreening = async (req, res) => {
  try {
    console.log(req.body);
    const { doctorId, doctorName, volunteerId, volunteerName, studentId, campId, report, diagnosis } = req.body;

    // Validate required fields
    if (!volunteerId || !studentId || !campId) {
      return res.status(400).json({ message: 'Volunteer ID, Student ID, and Camp ID are required.' });
    }

    // Create a new screening
    const newScreening = new Screening({
      doctorId,
      doctorName,
      volunteerId,
      volunteerName,
      studentId,
      campId,
      report,
      diagnosis,
      date: new Date(), // Automatically set the current date
    });

    const savedScreening = await newScreening.save();
    res.status(201).json({ message: 'Screening added successfully!', screening: savedScreening });
  } catch (error) {
    console.error('Error adding screening:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Function to update an existing screening
const updateScreening = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor, volunteer, student, camp, report } = req.body;

    const screening = await Screening.findById(id);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found.' });
    }

    if (doctor) {
      const doctorExists = await Doctor.findById(doctor);
      if (!doctorExists) {
        return res.status(404).json({ message: 'Doctor not found.' });
      }
      screening.doctor = doctor;
    }

    if (volunteer) {
      const volunteerExists = await Volunteer.findById(volunteer);
      if (!volunteerExists) {
        return res.status(404).json({ message: 'Volunteer not found.' });
      }
      screening.volunteer = volunteer;
    }

    if (student) {
      const studentExists = await Student.findById(student);
      if (!studentExists) {
        return res.status(404).json({ message: 'Student not found.' });
      }
      screening.student = student;
    }

    if (camp) {
      const campExists = await Camp.findById(camp);
      if (!campExists) {
        return res.status(404).json({ message: 'Camp not found.' });
      }
      screening.camp = camp;
    }

    if (report) {
      screening.report = report;
    }

    const updatedScreening = await screening.save();
    res.status(200).json({ message: 'Screening updated successfully!', screening: updatedScreening });
  } catch (error) {
    console.error('Error updating screening:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  addScreening,
  updateScreening,
};
