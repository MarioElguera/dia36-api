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

router.get('/', verifyToken, verifyAdmin, getUsers);
router.get('/:id', verifyToken, verifyAdmin, getUserDetail);
router.post('/', verifyToken, verifyAdmin, createUser);
router.put('/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
