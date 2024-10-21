const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



// API to map user relationships
const mapUserRelationships = async (req, res) => {
  try {
    const { userId, supervisors, peers, juniors } = req.body;

    // Convert string ids to ObjectId using 'new' keyword
    const supervisorsObjectId = supervisors.map(id => new mongoose.Types.ObjectId(id));
    const peersObjectId = peers.map(id => new mongoose.Types.ObjectId(id));
    const juniorsObjectId = juniors.map(id => new mongoose.Types.ObjectId(id));

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          supervisors: supervisorsObjectId,
          peers: peersObjectId,
          juniors: juniorsObjectId,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User relationships updated successfully', user });
  } catch (error) {
    console.error('Error updating user relationships:', error); // Log detailed error
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
// Register a new user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "Testing123", {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user });
    console.log(res.json, "User Created successfully");
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Checking if user exists...");
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found, comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password matched, generating token...");
    const token = jwt.sign({ id: user._id, role: user.role }, "Testing123", {
      expiresIn: "1h",
    });

    console.log("Token generated, sending response...");
    res.json({ token, user });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all users (Admin access)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  }
  catch(error) {
    res.status(500).json({message: "Server error"})
}
};


module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  mapUserRelationships
};
