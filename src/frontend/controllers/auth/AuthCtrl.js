exports.pageAuth = (req, res) => {
    res.render('auth/login', {
        nombrePagina: 'login Sistema',
        pageAuthLogin: true,
        layout: false
    })
}

exports.pantalla_inicio = (req, res) => {
    if(true)
        return res.render('blank', {
            nombrePagina: 'Inicio'
        });
    
    return res.render('auth/index', {
        nombrePagina: 'Registro de Calificaciones',
        pageAuthIndex: true,
        layout: 'auth-layout'
    })
}

exports.recuperacion = (req, res) => {
    return res.render('auth/recuperacion',{
        nombrePagina: 'Auth - Recuperacion',
        pageAuthLogin: true,
        layout: false
    })
}

exports.newPassword = (req, res) => {
    return res.render('auth/new_password',{
        nombrePagina: 'Auth - New Password',
        pageAuthLogin: true,
        layout: false
    })
}

// exports.pantalla_inicio = (req, res) => {
//     res.render('modulos/registro-calificaciones/home', {
//         nombrePagina: 'Calificaciones'
//     })
// }