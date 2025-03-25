const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');

router.get('/', verifyToken, verifyAdmin, autorController.getAutores);
router.get('/:id', verifyToken, verifyAdmin, autorController.getAutor);
router.post('/', verifyToken, verifyAdmin, autorController.createAutor);
router.put('/:id', verifyToken, verifyAdmin, autorController.updateAutor);
router.delete('/:id', verifyToken, verifyAdmin, autorController.deleteAutor);

module.exports = router;
