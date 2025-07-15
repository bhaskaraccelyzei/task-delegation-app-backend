const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createUser);

module.exports = router;
