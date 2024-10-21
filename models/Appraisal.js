const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selfAnswer: { type: String },  // Answer from the employee (self-appraisal)
  supervisorAnswer: { type: String },  // Answer from the supervisor
  peerAnswers: [{
    peerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answer: { type: String }
  }],
  juniorAnswers: [{
    juniorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answer: { type: String }
  }],
  submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appraisal', appraisalSchema);
