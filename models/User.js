// models/User.js
const db = require('../config/db');

// Crear un nuevo usuario
const createUser = (username, password, isAdmin, callback) => {
    const query = 'INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)';
    db.query(query, [username, password, isAdmin], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Buscar un usuario por su nombre de usuario
const findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Buscar un usuario por su nombre de usuario
const findUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Obtener todos los usuarios
const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Actualizar un usuario
const updateUser = (id, updateData, callback) => {
    const { username, password, isAdmin } = updateData;
    const query = 'UPDATE users SET username = ?, password = ?, isAdmin = ? WHERE id = ?';
    db.query(query, [username, password, isAdmin, id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Actualizar un usuario
const updateUser2 = (id, username, password, isAdmin, callback) => {
    const query = 'UPDATE users SET username = ?, password = ?, isAdmin = ? WHERE id = ?';
    db.query(query, [username, password, isAdmin, id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Eliminar un usuario
const deleteUser = (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Verificar si un usuario es admin
const isAdmin = (id, callback) => {
    const query = 'SELECT isAdmin FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0].isAdmin);
    });
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    isAdmin,
};
