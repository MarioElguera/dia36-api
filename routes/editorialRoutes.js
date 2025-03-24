const express = require('express');
const router = express.Router();
const editorialController = require('../controllers/editorialController');

router.post('/', editorialController.createEditorial);
router.get('/', editorialController.getEditoriales);
router.get('/:id', editorialController.getEditorial);
router.put('/:id', editorialController.updateEditorial);
router.delete('/:id', editorialController.deleteEditorial);

module.exports = router;
