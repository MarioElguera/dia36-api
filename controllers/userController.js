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

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, password, isAdmin } = req.body;

    // Crear un objeto con los datos a actualizar
    const updateData = {};

    // Solo agregar al objeto los campos que tienen valor
    if (username) {
        updateData.username = username;
    }

    if (password) {
        // Si hay una nueva contraseña, la ciframos
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).send('Error al cifrar la contraseña');
            updateData.password = hashedPassword;

            // Verificamos si 'isAdmin' tiene valor y lo agregamos
            if (isAdmin !== undefined) {
                updateData.isAdmin = isAdmin;
            }

            // Actualizar solo los campos que se incluyeron en 'updateData'
            User.updateUser(id, updateData, (err, result) => {
                if (err) return res.status(500).send('Error al actualizar el usuario');
                res.send('Usuario actualizado');
            });
        });
        return; // Evitamos que el resto del código se ejecute antes de la cifrado de la contraseña
    }

    // Si no hay una nueva contraseña, solo actualizamos los demás campos
    if (isAdmin !== undefined) {
        updateData.isAdmin = isAdmin;
    }

    // Si hay algún campo para actualizar, lo hacemos
    if (Object.keys(updateData).length > 0) {
        User.updateUser(id, updateData, (err, result) => {
            if (err) return res.status(500).send('Error al actualizar el usuario');
            res.send('Usuario actualizado');
        });
    } else {
        res.status(400).send('No se han proporcionado datos para actualizar');
    }
};


// Eliminar un usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.deleteUser(id, (err, result) => {
        if (err) return res.status(500).send('Error al eliminar el usuario');
        res.send('Usuario eliminado');
    });
};