const db = require('../config/db');

// Obtener todos los libros con sus autores
const getAllLibros = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                l.libro_id, 
                l.titulo, 
                l.fecha_publicacion, 
                l.editorial_id, 
                a.autor_id, 
                a.nombre AS autor_nombre, 
                a.nacionalidad, 
                a.fecha_nacimiento
            FROM Libros l
            LEFT JOIN Autores_Libros al ON l.libro_id = al.libro_id
            LEFT JOIN Autores a ON al.autor_id = a.autor_id
        `;

        db.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            const librosMap = {};

            results.forEach(row => {
                const { libro_id, titulo, fecha_publicacion, editorial_id, autor_id, autor_nombre, nacionalidad, fecha_nacimiento } = row;

                if (!librosMap[libro_id]) {
                    librosMap[libro_id] = {
                        libro_id,
                        titulo,
                        fecha_publicacion,
                        editorial_id,
                        autores: []
                    };
                }

                if (autor_id) {
                    librosMap[libro_id].autores.push({
                        autor_id,
                        nombre: autor_nombre,
                        nacionalidad,
                        fecha_nacimiento
                    });
                }
            });

            resolve(Object.values(librosMap));
        });
    });
};



// Obtener un libro por ID
const getLibroById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Libros WHERE libro_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};

// Obtener libros por autor
const getLibrosPorAutor = async (autorId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Libros WHERE libro_id IN (SELECT libro_id FROM Autores_Libros WHERE autor_id = ?)', [autorId], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Crear un nuevo libro
const createLibro = (titulo, fecha_publicacion, editorial_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO Libros (titulo, fecha_publicacion, editorial_id) VALUES (?, ?, ?)',
            [titulo, fecha_publicacion, editorial_id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};

// Actualizar un libro
const updateLibro = async (id, data) => {
    return new Promise((resolve, reject) => {
        const { titulo, fecha_publicacion, editorial_id, autores } = data;
        console.log("updateLibro: ", data);

        db.query(
            'UPDATE Libros SET titulo = ?, fecha_publicacion = ?, editorial_id = ? WHERE libro_id = ?',
            [titulo, fecha_publicacion, editorial_id, id],
            (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.query('DELETE FROM Autores_Libros WHERE libro_id = ?', [id], (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (autores.length === 0) {
                        resolve({ id, ...data });
                        return;
                    }

                    const insertQueries = autores.map((autor_id) => {
                        return new Promise((resolve, reject) => {
                            db.query(
                                'INSERT INTO Autores_Libros (libro_id, autor_id) VALUES (?, ?)',
                                [id, autor_id],
                                (err) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve();
                                    }
                                }
                            );
                        });
                    });

                    Promise.all(insertQueries)
                        .then(() => resolve({ id, ...data }))
                        .catch((err) => reject(err));
                });
            }
        );
    });
};


// Eliminar un libro
const deleteLibro = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Libros WHERE libro_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getAllLibros,
    getLibroById,
    getLibrosPorAutor,
    createLibro,
    updateLibro,
    deleteLibro,
};
