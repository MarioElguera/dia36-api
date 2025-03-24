const db = require('../config/db');

// Obtener todos los autores-libros
const getAutoresLibros = (callback) => {
    db.query('SELECT * FROM autores_libros', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Crear un nuevo autor-libro
const createAutorLibro = (autor_id, libro_id, callback) => {
    db.query(
        'INSERT INTO Autores_Libros (autor_id, libro_id) VALUES (?, ?)',
        [autor_id, libro_id],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
    );
};

// Insertar los autores en la tabla "Autores_Libros"
const createAutoresLibros = (libro_id, autores) => {
    return new Promise((resolve, reject) => {
        const autorLibrosPromises = autores.map(autorId => {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO Autores_Libros (autor_id, libro_id) VALUES (?, ?)',
                    [autorId, libro_id],
                    (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(results);
                    }
                );
            });
        });

        Promise.all(autorLibrosPromises)
            .then(resolve)
            .catch(reject);
    });
};

module.exports = {
    createAutoresLibros,
};


// Actualizar un autor-libro
const updateAutorLibro = (autor_id, libro_id, new_autor_id, new_libro_id, callback) => {
    db.query(
        'UPDATE Autores_Libros SET autor_id = ?, libro_id = ? WHERE autor_id = ? AND libro_id = ?',
        [new_autor_id, new_libro_id, autor_id, libro_id],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
    );
};

// Eliminar un autor-libro
const deleteAutorLibro = (autor_id, libro_id, callback) => {
    db.query(
        'DELETE FROM Autores_Libros WHERE autor_id = ? AND libro_id = ?',
        [autor_id, libro_id],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
    );
};

module.exports = {
    getAutoresLibros,
    createAutorLibro,
    createAutoresLibros,
    updateAutorLibro,
    deleteAutorLibro
};
