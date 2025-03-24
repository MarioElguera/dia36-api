const express = require('express');
const router = express.Router();
const { getLibros, getLibro, getLibrosPorAutor, createLibro, updateLibro, deleteLibro } = require('../controllers/libroController');

router.get('/', getLibros);
router.get('/:id', getLibro);
router.get('/autor/:autor_id', getLibrosPorAutor);
router.post('/', createLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

module.exports = router;
