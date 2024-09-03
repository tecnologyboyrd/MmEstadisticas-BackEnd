/*  
    Path when I'll call the services
    Path: /api/state
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { createState, getStates, deleteState } = require('../controller/state_controller');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();

router.post('/new', [
    check("name", "The state name is required").not().isEmpty(),
    check("country", "The country ID is required").isMongoId(),
    validarCampos,
], createState);

router.get('/', getStates);

router.delete('/:id', deleteState);

module.exports = router;