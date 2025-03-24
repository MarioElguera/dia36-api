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
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONT_URL || 'http://mi-dominio.com',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.set('db', db);

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

app.use('/autores', autorRoutes);
app.use('/libros', libroRoutes);
app.use('/ventas', ventaRoutes);
app.use('/editoriales', editorialRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
