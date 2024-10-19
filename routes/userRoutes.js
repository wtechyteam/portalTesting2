const express = require('express');
const { createUser, loginUser, getUsers, getUserById } = require('./../controllers/userController')
const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to get all users (admin access)
router.get('/', getUsers)

// Route to get a specific user by ID (admin or the user himself)
router.get('/:id', getUserById);

module.exports = router;
