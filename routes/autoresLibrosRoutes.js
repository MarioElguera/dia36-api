const express = require('express');
const autoresLibrosController = require('../controllers/autoresLibrosController');
const router = express.Router();

router.get('/', autoresLibrosController.getAutoresLibros);
router.post('/', autoresLibrosController.createAutorLibro);
router.put('/:autor_id/:libro_id', autoresLibrosController.updateAutorLibro);
router.delete('/:autor_id/:libro_id', autoresLibrosController.deleteAutorLibro);

module.exports = router;
