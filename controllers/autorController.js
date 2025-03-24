const autorModel = require('../models/autorModel');

// Listar todos los autores
const getAutores = async (req, res) => {
    try {
        const autores = await autorModel.getAllAutores();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
};

// Obtener un autor por ID
const getAutor = async (req, res) => {
    try {
        const autor = await autorModel.getAutorById(req.params.id);
        if (autor) {
            res.status(200).json(autor);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el autor' });
    }
};

// Crear un autor
const createAutor = async (req, res) => {
    try {
        const autor = await autorModel.createAutor(req.body);
        res.status(201).json(autor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el autor' });
    }
};

// Actualizar un autor
const updateAutor = async (req, res) => {
    try {
        const autor = await autorModel.updateAutor(req.params.id, req.body);
        res.status(200).json(autor);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
};

// Eliminar un autor
const deleteAutor = async (req, res) => {
    try {
        await autorModel.deleteAutor(req.params.id);
        res.status(200).json({ message: 'Autor eliminado con éxito' });
    } catch (error) {
        console.log("deleteAutor | error: ", error);
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
};

module.exports = {
    getAutores,
    getAutor,
    createAutor,
    updateAutor,
    deleteAutor,
};
