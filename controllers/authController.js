const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const secret = 'your_jwt_secret';

// Login de usuario
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findUserByUsername(username, (err, user) => {
        if (err || !user) return res.status(400).send('Usuario no encontrado');

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(400).send('Credenciales inválidas');

            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};

// Middleware para verificar JWT
exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acceso Denegado');

    try {
        const decoded = jwt.verify(token, secret);
        console.log("authController | decoded: ", decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Token inválido');
    }
};

// Middleware para verificar si es admin
exports.verifyAdmin = (req, res, next) => {
    User.isAdmin(req.user.id, (err, isAdmin) => {
        if (err || !isAdmin) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    });
};
