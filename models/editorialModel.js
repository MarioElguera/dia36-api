const db = require('../config/db');

// Obtener todas las editoriales
const getAllEditoriales = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Editoriales', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Obtener una editorial por ID
const getEditorialById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Editoriales WHERE editorial_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};

// Crear una nueva editorial
const createEditorial = async (data) => {
    return new Promise((resolve, reject) => {
        const { nombre, pais } = data;
        db.query('INSERT INTO Editoriales (nombre, pais) VALUES (?, ?)',
            [nombre, pais], (err, results) => {
                if (err) reject(err);
                resolve({ editorial_id: results.insertId, ...data });
            });
    });
};

// Actualizar una editorial
const updateEditorial = async (id, data) => {
    return new Promise((resolve, reject) => {
        const { nombre, pais } = data;
        db.query('UPDATE Editoriales SET nombre = ?, pais = ? WHERE editorial_id = ?',
            [nombre, pais, id], (err, results) => {
                if (err) reject(err);
                resolve({ editorial_id: id, ...data });
            });
    });
};

// Eliminar una editorial
const deleteEditorial = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Editoriales WHERE editorial_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getAllEditoriales,
    getEditorialById,
    createEditorial,
    updateEditorial,
    deleteEditorial,
};
