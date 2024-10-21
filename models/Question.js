const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  askedForUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the user being asked
    required: true, // Make this required if you always need to know who the question is for
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model("Question", questionSchema);
