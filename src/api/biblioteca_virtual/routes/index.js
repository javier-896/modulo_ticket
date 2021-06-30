const express = require('express');
const router = express.Router();

//controllers
const LibrosCtrl = require('../controllers/LibrosCtrl');

//const { check } = require('express-validator');

router.get('/', LibrosCtrl.obtenerLibros);
router.get('/:id', LibrosCtrl.obtenerLibroPorId);
router.post('/', LibrosCtrl.agregarLibro);
router.put('/:id', LibrosCtrl.actualizarLibro);
router.delete('/:id', LibrosCtrl.eliminarLibro);

module.exports = router;