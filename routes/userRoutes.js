const express = require('express');
const {
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');
const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getUsers);
router.get('/user/:id', verifyToken, verifyAdmin, getUserDetail);
router.post('/users', verifyToken, verifyAdmin, createUser);
router.put('/users/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
