const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');

//controllers
const ticketC = require ('../controller/ticket');

//const { check } = require('express-validator');
router.get('/ver/:id',ticketC.verticketenviado);
router.get('/new/:id', ticketC.mensajeNuevo);
router.get('/:id', ticketC.verMensajes);
router.get('/mjs/:id', ticketC.verMensajexid);
router.get('/agenda/:id',ticketC.agenda); // una especie de contatos
router.post('/',[
check('descripcion','Se esperaba un valor minimo de 4 caracteres').isLength({min:4}),
check('descripcion','No se permiten mas de 250 caracteres').isLength({max:250})
],ticketC.insertMensaje); //
router.put('/:id', ticketC.mensajeLeido);//actualizar mensaje a leido
router.delete('/delete/:id', ticketC.eliminar_mensaje);//eliminar mensaje

module.exports = router;    