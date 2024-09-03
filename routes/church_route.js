const { Router } = require('express');
const { check } = require('express-validator');
const { createChurch, getChurches, updateChurch, deleteChurch } = require('../controller/church_controller');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();

router.post('/new', [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    check("pastor", "El ID del pastor es obligatorio").isMongoId(),
    check("country", "El ID del país es obligatorio").isMongoId(),
    check("state", "El ID del estado es obligatorio").isMongoId(),
    check("city", "El ID de la ciudad es obligatorio").isMongoId(),
    validarCampos,
], createChurch);

router.get('/', getChurches);

router.put('/:id', [
    check("pastor", "El ID del pastor debe ser válido").optional().isMongoId(),
    check("country", "El ID del país debe ser válido").optional().isMongoId(),
    check("state", "El ID del estado debe ser válido").optional().isMongoId(),
    check("city", "El ID de la ciudad debe ser válido").optional().isMongoId(),
    validarCampos,
], updateChurch);

router.delete('/:id', deleteChurch);

module.exports = router;
