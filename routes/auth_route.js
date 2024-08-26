/*
    Path donde voy a llamar el servicio
    path : '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controller/auth_controller');
const { validarCampos } = require('../midlewares/validar-campos');
const { validarJWT } = require('../midlewares/validar-jwt');


const router = Router();

router.post('/new',[
    check("name", "The name parameter is required").not().isEmpty(),
    check("email", "The email parameter is required and the email format have to be valid").isEmail().not().isEmpty(),
    check("password", "The password parameter is required").not().isEmpty(),
    validarCampos,
] ,createUser);

router.post('/',[
    check("email", "The email parameter is required and the email format have to be valid").isEmail().not().isEmpty(),
    check("password", "The password parameter is required").not().isEmpty(),
    validarCampos,
] ,loginUser);

//TODO : ValidarToken - Pendiente de crear
router.get('/renew', validarJWT, renewToken);


module.exports = router;
