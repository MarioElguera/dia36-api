const db = require('../config/db');

// Obtener todos los autores
const getAllAutores = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Autores', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Obtener un autor por ID
const getAutorById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Autores WHERE autor_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};

// Crear un autor
const createAutor = async (data) => {
    return new Promise((resolve, reject) => {
        const { nombre, nacionalidad, fecha_nacimiento } = data;
        db.query('INSERT INTO Autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)',
            [nombre, nacionalidad, fecha_nacimiento], (err, results) => {
                if (err) reject(err);
                resolve({ id: results.insertId, ...data });
            });
    });
};

// Actualizar un autor
const updateAutor = async (id, data) => {
    return new Promise((resolve, reject) => {
        const { nombre, nacionalidad, fecha_nacimiento } = data;
        db.query('UPDATE Autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ? WHERE autor_id = ?',
            [nombre, nacionalidad, fecha_nacimiento, id], (err, results) => {
                if (err) reject(err);
                resolve({ id, ...data });
            });
    });
};

// Eliminar un autor
const deleteAutor = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Autores WHERE autor_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor,
};
