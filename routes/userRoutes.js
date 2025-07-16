const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createUser);
router.get('/', authMiddleware, getAllUsers);


module.exports = router;
