const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["staff", "admin", "supervisor"],
    default: "staff",
  },
  supervisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model("User", userSchema);
