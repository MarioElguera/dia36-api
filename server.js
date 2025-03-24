const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./config/db');

const autorRoutes = require('./routes/autorRoutes');
const libroRoutes = require('./routes/libroRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const editorialRoutes = require('./routes/editorialRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const APP_NAME = process.env.APP_NAME;

app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"]
    })
);
app.use(bodyParser.json());

app.set('db', db);
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor",
        error: process.env.NODE_ENV === "development" ? err.stack : {},
    });
}

app.get('/', (req, res) => {
    res.send(`Bienvenido a ${APP_NAME}`);
});

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

app.use('/autores', autorRoutes);
app.use('/libros', libroRoutes);
app.use('/ventas', ventaRoutes);
app.use('/editoriales', editorialRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} | \nFRONTEND_URL: `, FRONTEND_URL);
});
