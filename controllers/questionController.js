const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  const { text, askedForUserId } = req.body;

  try {
    const question = new Question({
      text,
    //   userId, // ID of the user asking the question
      askedForUserId, // ID of the user for whom the question is asked
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Get all questions (Admin access)
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('askedForUserId', 'name emailId'); // Populate with user details if necessary
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};

// Get a question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  const { text } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
