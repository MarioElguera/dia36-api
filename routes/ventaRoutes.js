const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { verifyToken, verifyAdmin } = require('../controllers/authController');

router.get('/', verifyToken, verifyAdmin, ventaController.getVentas);
router.get('/:id', verifyToken, verifyAdmin, ventaController.getVenta);
router.post('/', verifyToken, verifyAdmin, ventaController.createVenta);
router.put('/:id', verifyToken, verifyAdmin, ventaController.updateVenta);
router.delete('/:id', verifyToken, verifyAdmin, ventaController.deleteVenta);

module.exports = router;
