const libroModel = require('../models/libroModel');
const autoresLibrosModel = require('../models/autoresLibrosModel');

// Listar todos los libros
const getLibros = async (req, res) => {
    try {
        const libros = await libroModel.getAllLibros();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
};

// Obtener un libro por ID
const getLibro = async (req, res) => {
    try {
        const libro = await libroModel.getLibroById(req.params.id);
        if (libro) {
            res.status(200).json(libro);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
};

// Obtener libros por autor
const getLibrosPorAutor = async (req, res) => {
    try {
        const libros = await libroModel.getLibrosPorAutor(req.params.autor_id);
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros del autor' });
    }
};

// Crear un libro con múltiples autores
const createLibro = async (req, res) => {
    const { titulo, fecha_publicacion, editorial_id, autores } = req.body;

    try {
        // Verificar que se seleccionen autores
        if (!autores || autores.length === 0) {
            return res.status(400).json({ error: 'Se deben seleccionar al menos un autor' });
        }

        // Crear el libro
        const libro = await libroModel.createLibro(titulo, fecha_publicacion, editorial_id);
        const libro_id = libro.insertId;

        // Crear las relaciones entre libro y autores (usando await)
        const results = await autoresLibrosModel.createAutoresLibros(libro_id, autores);

        res.status(201).json({ message: 'Libro y autores registrados con éxito', libro_id });
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
    }
};



// Actualizar un libro
const updateLibro = async (req, res) => {
    try {
        const libro = await libroModel.updateLibro(req.params.id, req.body);
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
};

// Eliminar un libro
const deleteLibro = async (req, res) => {
    try {
        await libroModel.deleteLibro(req.params.id);
        res.status(200).json({ message: 'Libro eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
};

module.exports = {
    getLibros,
    getLibro,
    getLibrosPorAutor,
    createLibro,
    updateLibro,
    deleteLibro,
};
