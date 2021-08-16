const express = require('express');
const router = express.Router();



// controllers
const authCtrl = require('../controllers/auth/AuthCtrl'); 
const calificacionesCtrl = require('../controllers/registro_calificaciones/ModRegistroCalificacionesCtrl');
const modTiicket  = require('../controllers/moduloTicket/ticketCtrl.js');
//const { check } = require('express-validator'); 

router.get('/auth/login', authCtrl.pageAuth);
router.get('/auth/recuperacion', authCtrl.recuperacion);
router.get('/auth/new_password', authCtrl.newPassword);
router.get('/', authCtrl.pantalla_inicio);

router.get('/calificaciones', calificacionesCtrl.pantalla_inicio);
//pantallas modulo ticket
router.get('/mensajes', modTiicket.pantalla_ticket);
router.get('/mensajeNuevo', modTiicket.pantalla_nuevoMjs);
router.get('/responder/:id', modTiicket.pantalla_responderticket);
router.get('/ticketenviados', modTiicket.pantalla_ticketenviado);
router.get('/verticket/:id', modTiicket.pantalla_verticket);
router.get('/reporte', modTiicket.pantalla_reporteResumen);


//router.get('*', (req, res) => res.redirect('/') );
module.exports = router;