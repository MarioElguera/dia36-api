const express = require('express');
const router = express.Router();
const { getLibros, getLibro, getLibrosPorAutor, createLibro, updateLibro, deleteLibro } = require('../controllers/libroController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');

router.get('/', verifyToken, verifyAdmin, getLibros);
router.get('/:id', verifyToken, verifyAdmin, getLibro);
router.get('/autor/:autor_id', verifyToken, verifyAdmin, getLibrosPorAutor);
router.post('/', verifyToken, verifyAdmin, createLibro);
router.put('/:id', verifyToken, verifyAdmin, updateLibro);
router.delete('/:id', verifyToken, verifyAdmin, deleteLibro);

module.exports = router;
