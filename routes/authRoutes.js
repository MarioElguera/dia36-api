const express = require('express');
const { login } = require('../controllers/authController');
const { createUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);

module.exports = router;
