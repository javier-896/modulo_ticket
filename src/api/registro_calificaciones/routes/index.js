const express = require('express');
const router = express.Router();
const mysqlConnection = require('../../../config/db');
//controllers
//const LibrosCtrl = require('../controllers/librosController');

//const { check } = require('express-validator');

router.get('/', (req, res)=>{
    res.send('Hola mundo');
});

router.get('/select', async (req, res)=>{
    try {
        const result = await mysqlConnection.query('SELECT * FROM nota_final');
        return res.json({status: 'ok', result, error: false});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;