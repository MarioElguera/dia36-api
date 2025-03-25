const express = require('express');
const router = express.Router();
const editorialController = require('../controllers/editorialController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');

router.post('/', verifyToken, verifyAdmin, editorialController.createEditorial);
router.get('/', verifyToken, verifyAdmin, editorialController.getEditoriales);
router.get('/:id', verifyToken, verifyAdmin, editorialController.getEditorial);
router.put('/:id', verifyToken, verifyAdmin, editorialController.updateEditorial);
router.delete('/:id', verifyToken, verifyAdmin, editorialController.deleteEditorial);

module.exports = router;
