const autoresLibrosModel = require('../models/autoresLibrosModel');

// Obtener todos los autores-libros
const getAutoresLibros = (req, res) => {
    autoresLibrosModel.getAutoresLibros((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los datos', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear un nuevo autor-libro
const createAutorLibro = (req, res) => {
    const { autor_id, libro_id } = req.body;
    autoresLibrosModel.createAutorLibro(autor_id, libro_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al insertar datos', error: err });
        }
        res.status(201).json({ message: 'Autor-Libro creado correctamente', data: results });
    });
};

// Actualizar un autor-libro
const updateAutorLibro = (req, res) => {
    const { autor_id, libro_id } = req.params;
    const { new_autor_id, new_libro_id } = req.body;

    autoresLibrosModel.updateAutorLibro(autor_id, libro_id, new_autor_id, new_libro_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar datos', error: err });
        }
        res.status(200).json({ message: 'Autor-Libro actualizado correctamente' });
    });
};

// Eliminar un autor-libro
const deleteAutorLibro = (req, res) => {
    const { autor_id, libro_id } = req.params;

    autoresLibrosModel.deleteAutorLibro(autor_id, libro_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar datos', error: err });
        }
        res.status(200).json({ message: 'Autor-Libro eliminado correctamente' });
    });
};

module.exports = {
    getAutoresLibros,
    createAutorLibro,
    updateAutorLibro,
    deleteAutorLibro
};
