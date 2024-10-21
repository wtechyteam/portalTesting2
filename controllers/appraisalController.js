const Appraisal = require('../models/Appraisal');

// Self-Appraisal Submission
const submitSelfAppraisal = async (req, res) => {
  const { employeeId, questionId, selfAnswer } = req.body;

  try {
    const appraisal = await Appraisal.findOneAndUpdate(
      { employeeId, questionId },
      { selfAnswer },
      { new: true, upsert: true }
    );
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting self-appraisal', error });
  }
};

// Supervisor Appraisal Submission
const submitSupervisorAppraisal = async (req, res) => {
  const { employeeId, questionId, supervisorAnswer } = req.body;

  try {
    const appraisal = await Appraisal.findOneAndUpdate(
      { employeeId, questionId },
      { supervisorAnswer },
      { new: true, upsert: true }
    );
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting supervisor appraisal', error });
  }
};

// Peer Appraisal Submission
const submitPeerAppraisal = async (req, res) => {
  const { employeeId, questionId, peerId, answer } = req.body;

  try {
    const appraisal = await Appraisal.findOneAndUpdate(
      { employeeId, questionId },
      { $push: { peerAnswers: { peerId, answer } } },
      { new: true, upsert: true }
    );
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting peer appraisal', error });
  }
};

// Junior Appraisal Submission
const submitJuniorAppraisal = async (req, res) => {
  const { employeeId, questionId, juniorId, answer } = req.body;

  try {
    const appraisal = await Appraisal.findOneAndUpdate(
      { employeeId, questionId },
      { $push: { juniorAnswers: { juniorId, answer } } },
      { new: true, upsert: true }
    );
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting junior appraisal', error });
  }
};

const getAppraisalsForManager = async (req, res) => {
  const { employeeId } = req.params;
  const managerId = req.user._id; // The logged-in manager's ID

  try {
    // Fetch self-appraisal of the employee and manager's own answers
    const appraisals = await Appraisal.findOne({
      employeeId,
    }).populate('supervisorId', 'name') // Optional: populate supervisor's name
      .populate('peerAnswers.peerId', 'name') // Optional: populate peer's name
      .populate('juniorAnswers.juniorId', 'name'); // Optional: populate junior's name

    if (!appraisals) {
      return res.status(404).json({ message: 'No appraisals found for this employee' });
    }

    // Filter to get only necessary data for the manager
    const managerAppraisals = {
      selfAppraisal: appraisals.selfAppraisal,
      supervisorAnswer: appraisals.supervisorAnswer, // Manager's own supervisor answer
      peerAnswers: appraisals.peerAnswers.filter(peer => peer.peerId.toString() === managerId), // Manager's peer answers
      juniorAnswers: appraisals.juniorAnswers.filter(junior => junior.juniorId.toString() === managerId), // Manager's junior answers
    };

    res.status(200).json(managerAppraisals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manager\'s appraisals', error });
  }
};

// Get all appraisals for a specific employee (Admin access)
const getAppraisalsForAdmin = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const appraisals = await Appraisal.find({ employeeId });
    res.status(200).json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appraisals', error });
  }
};


const getPeerAppraisals = async (req, res) => {
  const { employeeId } = req.params;
  const peerId = req.user._id; // Get the logged-in peer's ID

  try {
    const appraisal = await Appraisal.find(
      { employeeId, 'peerAnswers.peerId': peerId },
      { 'peerAnswers.$': 1 } // Fetch only the peer's own answer
    );
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching peer appraisals', error });
  }
};

module.exports = {
  submitSelfAppraisal,
  submitSupervisorAppraisal,
  submitPeerAppraisal,
  submitJuniorAppraisal,
  getPeerAppraisals,
  getAppraisalsForManager,
  getAppraisalsForAdmin,
};
