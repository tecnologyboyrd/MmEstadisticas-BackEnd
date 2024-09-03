/*
    Path when I'll call the services
    Path: /api/pastor
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createPastor, getPastors, deletePastor, updatePastor } = require('../controller/pastor_controller');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();

router.post('/new', [
    check("name", "The pastor's name is required").not().isEmpty(),
    check("lastName", "The pastor's last name is required").not().isEmpty(),
    check("degree", "The pastor's degree is required").not().isEmpty(),
    validarCampos,
], createPastor);

router.put('/update/:id', [
    check("name", "The pastor's name is required").not().isEmpty(),
    check("lastName", "The pastor's last name is required").not().isEmpty(),
    check("degree", "The pastor's degree is required").not().isEmpty(),
    validarCampos,
], updatePastor);

router.get('/', getPastors);

router.delete('/delete/:id', deletePastor);

module.exports = router;
