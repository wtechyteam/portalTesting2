const Appraisal = require('../models/Appraisal');

// Submit a new appraisal
const submitAppraisal = async (req, res) => {
  const { participantId, responses } = req.body;
  try {
    const newAppraisal = new Appraisal({ participantId, responses });
    await newAppraisal.save();
    res.status(201).json({ message: 'Appraisal submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get appraisals for a participant
const getAppraisals = async (req, res) => {
  try {
    const appraisals = await Appraisal.find({ participantId: req.params.id });
    res.json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitAppraisal, getAppraisals };
