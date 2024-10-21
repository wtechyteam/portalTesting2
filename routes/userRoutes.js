const express = require('express');
const { createUser, loginUser, getUsers, getUserById, deleteUser, mapUserRelationships } = require('./../controllers/userController')
const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to get all users (admin access)
router.get('/', getUsers);

// Route to get a specific user by ID (admin or the user himself)
router.get('/:id', getUserById);

// Route to delete a user
router.delete('/:id', deleteUser);

router.post('/map-user-relationships', mapUserRelationships);
module.exports = router;
