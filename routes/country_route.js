/*  
    Path when I'll call the services
    Path: /api/country
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createCountry, getCountries, deleteCountry, updateCountry } = require('../controller/country_controller');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();


router.post('/new', [
    check("name", "The country name is required").not().isEmpty(),
    check("code", "The country code is required").not().isEmpty(),
    validarCampos,
], createCountry);

router.put('/update/:id', [
    check("name", "The country name is required").not().isEmpty(),
    check("code", "The country code is required").not().isEmpty(),
    validarCampos,
], updateCountry);

router.get('/', getCountries);

router.delete('/delete/:id', deleteCountry);

module.exports = router;