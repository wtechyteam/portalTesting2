const mongoose = require('mongoose');
const appraisalSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [{ questionId: String, answer: String }],
});
module.exports = mongoose.model('Appraisal', appraisalSchema);
