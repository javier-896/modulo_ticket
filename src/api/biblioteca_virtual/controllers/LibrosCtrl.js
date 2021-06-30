const mysqlConnection = require('../../../config/db');

exports.obtenerLibros = async (req, res) => {
    try {
        const libros = await mysqlConnection.query('SELECT * FROM libros');
        return res.json(libros);
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerLibroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const libro = await mysqlConnection.query('SELECT * FROM libros WHERE ID_LIBRO = ?',[id]);
        return res.json(libro);
    } catch (error) {
        console.log(error);
    }
}

exports.agregarLibro = async (req, res) => {
    
    const {ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, IDIOMA, 
        NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, 
        NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO} = req.body;
    
        const query = `CALL INS_LIBRO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    try {
        const result = await mysqlConnection.query(query,[ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, IDIOMA, NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO]);
        return res.json({Status: 'Libro Agregado'});
    } catch (error) {
        console.log(error);
    }

}

exports.actualizarLibro = async (req, res) => {
    const {ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, IDIOMA, 
        NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, 
        NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO} = req.body;
    
    const{id} = req.params;
    
    const query = 'CALL ACTU_LIBRO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    try {
        const result = await mysqlConnection.query(query, [id, ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, IDIOMA, NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO]);
        return res.json({Status: 'Libro Actualizado'});
    } catch (error) {
        console.log(error);
    }
}

exports.eliminarLibro = async (req, res) => {
    
    const {USR_REGISTRO} = req.body;
    const {id} = req.params;
    const query = 'CALL DEL_LIBRO(?, ?)';

    try {
        const result = await mysqlConnection.query(query, [id, USR_REGISTRO]);
        return res.json({Status: 'Libro Eliminado'});
    } catch (error) {
        console.log(error);
    }
}