const { Router } = require('express');
const { check } = require('express-validator');

const { createCity, getCities, deleteCity } = require('../controller/city_controller');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();

router.post('/new', [
    check("name", "The city name is required").not().isEmpty(),
    check("state", "The state ID is required").isMongoId(),
    validarCampos,
], createCity);

router.get('/', getCities);

router.delete('/:id', deleteCity);

module.exports = router;