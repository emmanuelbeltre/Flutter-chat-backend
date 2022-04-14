/*

 path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controller/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatoro').not().isEmpty(),
    check('email', 'No es un correo electrónico').isEmail(),
    validarCampos
], crearUsuario);


//POST: /
//Validar Email, Password

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatoro').not().isEmpty(),
    check('email', 'No es un correo electrónico').isEmail(),

], login);



//validarJWT

router.get('/renew', validarJWT, renewToken);




module.exports = router;
