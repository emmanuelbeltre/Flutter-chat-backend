/*

Path : /api/mensajes

*/



const { Router } = require('express');
const { obtenerChat } = require('../controller/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//validarJWT

router.get('/:de', validarJWT, obtenerChat);




module.exports = router;

