// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).send('Error al obtener usuarios');
        res.json(users);
    });
};

// Obtener detalle de usuario
exports.getUserDetail = (req, res) => {
    const { id } = req.params;

    User.findUserById(id, (err, users) => {
        if (err) return res.status(500).send('Error al obtener usuarios');
        res.json(users);
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { username, password, isAdmin } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error al cifrar la contraseña');

        User.createUser(username, hashedPassword, isAdmin, (err, result) => {
            if (err) {
                console.log("createUser | err", err);
                return res.status(500).send('Error al crear el usuario', err);
            }

            res.status(201).send('Usuario creado');
        });
    });
};

// Modificar un usuario
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, password, isAdmin } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error al cifrar la contraseña');

        User.updateUser(id, username, hashedPassword, isAdmin, (err, result) => {
            if (err) return res.status(500).send('Error al actualizar el usuario');
            res.send('Usuario actualizado');
        });
    });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.deleteUser(id, (err, result) => {
        if (err) return res.status(500).send('Error al eliminar el usuario');
        res.send('Usuario eliminado');
    });
};