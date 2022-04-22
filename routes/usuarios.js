/*

 path: api/usuarios

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios } = require('../controller/usuarios');

const router = Router();


//validarJWT

router.get('/', validarJWT, getUsuarios);




module.exports = router;

