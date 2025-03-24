const db = require('../config/db');

// Obtener todas las ventas con los datos de los libros
const getAllVentas = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                Ventas.venta_id,
                Ventas.libro_id,
                Ventas.libreria_nombre,
                Ventas.cantidad,
                Ventas.precio,
                Ventas.fecha_venta,
                Ventas.creado_en,
                Libros.titulo as libro_titulo,
                Libros.fecha_publicacion as libro_fecha_publicacion
            FROM Ventas
            INNER JOIN Libros ON Ventas.libro_id = Libros.libro_id;
        `;
        db.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};


// Obtener una venta por ID
const getVentaById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Ventas WHERE venta_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};

// Crear una venta
const createVenta = async (data) => {
    return new Promise((resolve, reject) => {
        const { libro_id, libreria_nombre, cantidad, precio, fecha_venta } = data;
        db.query('INSERT INTO Ventas (libro_id, libreria_nombre, cantidad, precio, fecha_venta) VALUES (?, ?, ?, ?, ?)',
            [libro_id, libreria_nombre, cantidad, precio, fecha_venta], (err, results) => {
                if (err) reject(err);
                resolve({ id: results.insertId, ...data });
            });
    });
};

// Actualizar una venta
const updateVenta = async (id, data) => {
    return new Promise((resolve, reject) => {
        const { libro_id, libreria_nombre, cantidad, precio, fecha_venta } = data;
        db.query(
            'UPDATE Ventas SET libro_id = ?, libreria_nombre = ?, cantidad = ?, precio = ?, fecha_venta = ? WHERE venta_id = ?',
            [libro_id, libreria_nombre, cantidad, precio, fecha_venta, id],
            (err, results) => {
                if (err) reject(err);
                resolve({ id, ...data });
            }
        );
    });
};

// Eliminar una venta
const deleteVenta = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Ventas WHERE venta_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
};
