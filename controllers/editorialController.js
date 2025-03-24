const editorialModel = require('../models/editorialModel');

// Listar todas las editoriales
const getEditoriales = async (req, res) => {
    try {
        const editoriales = await editorialModel.getAllEditoriales();
        res.status(200).json(editoriales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las editoriales' });
    }
};

// Obtener una editorial por ID
const getEditorial = async (req, res) => {
    try {
        const editorial = await editorialModel.getEditorialById(req.params.id);
        if (editorial) {
            res.status(200).json(editorial);
        } else {
            res.status(404).json({ error: 'Editorial no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la editorial' });
    }
};

// Crear una nueva editorial
const createEditorial = async (req, res) => {
    try {
        const editorial = await editorialModel.createEditorial(req.body);
        res.status(201).json(editorial);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la editorial' });
    }
};

// Actualizar una editorial
const updateEditorial = async (req, res) => {
    try {
        const editorial = await editorialModel.updateEditorial(req.params.id, req.body);
        res.status(200).json(editorial);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la editorial' });
    }
};

// Eliminar una editorial
const deleteEditorial = async (req, res) => {
    try {
        await db.query('DELETE FROM Ventas WHERE libro_id IN (SELECT libro_id FROM Libros WHERE editorial_id = ?)', [req.params.id]);
        await db.query('DELETE FROM Libros WHERE editorial_id = ?', [req.params.id]);
        await editorialModel.deleteEditorial(req.params.id);

        res.status(200).json({ message: 'Editorial eliminada con éxito' });
    } catch (error) {
        console.log("deleteEditorial | error: ", error);
        res.status(500).json({ error: 'Error al eliminar la editorial' });
    }
};


module.exports = {
    getEditoriales,
    getEditorial,
    createEditorial,
    updateEditorial,
    deleteEditorial,
};
