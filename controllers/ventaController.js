const ventaModel = require('../models/ventaModel');

// Listar todas las ventas
const getVentas = async (req, res) => {
    try {
        const ventas = await ventaModel.getAllVentas();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

// Obtener una venta por ID
const getVenta = async (req, res) => {
    try {
        const venta = await ventaModel.getVentaById(req.params.id);
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ error: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};

// Crear una venta
const createVenta = async (req, res) => {
    try {
        const venta = await ventaModel.createVenta(req.body);
        res.status(201).json(venta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

// Actualizar un venta
const updateVenta = async (req, res) => {
    try {
        const venta = await ventaModel.updateVenta(req.params.id, req.body);
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// Eliminar una venta
const deleteVenta = async (req, res) => {
    try {
        await ventaModel.deleteVenta(req.params.id);
        res.status(200).json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};

module.exports = {
    getVentas,
    getVenta,
    createVenta,
    updateVenta,
    deleteVenta,
};
