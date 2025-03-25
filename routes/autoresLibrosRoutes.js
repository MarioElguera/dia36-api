const express = require('express');
const autoresLibrosController = require('../controllers/autoresLibrosController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');
const router = express.Router();

router.get('/', verifyToken, verifyAdmin, autoresLibrosController.getAutoresLibros);
router.post('/', verifyToken, verifyAdmin, autoresLibrosController.createAutorLibro);
router.put('/:autor_id/:libro_id', verifyToken, verifyAdmin, autoresLibrosController.updateAutorLibro);
router.delete('/:autor_id/:libro_id', verifyToken, verifyAdmin, autoresLibrosController.deleteAutorLibro);

module.exports = router;
