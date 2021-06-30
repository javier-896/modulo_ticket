exports.pantalla_inicio = (req, res) => {
    res.render('modulos/registro-calificaciones/home', {
        nombrePagina: 'Calificaciones',
        registroCalificaciones: true
    })
}

