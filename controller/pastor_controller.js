const Pastor = require('../models/pastor');

// Crear un nuevo pastor
const createPastor = async (req, res) => {
    const { name, lastName, degree } = req.body;

    try {
        const pastor = new Pastor({ name, lastName, degree });
        await pastor.save();

        res.json({
            ok: true,
            pastor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating pastor'
        });
    }
};

// Obtener todos los pastores
const getPastors = async (req, res) => {
    try {
        const pastors = await Pastor.find();

        res.json({
            ok: true,
            pastors
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error fetching pastors'
        });
    }
};

// Actualizar un pastor
const updatePastor = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, degree } = req.body;

    try {
        const updatedPastor = await Pastor.findByIdAndUpdate(
            id,
            { name, lastName, degree },
            { new: true } // Para devolver el documento actualizado
        );

        if (!updatedPastor) {
            return res.status(404).json({
                ok: false,
                msg: 'Pastor not found'
            });
        }

        res.json({
            ok: true,
            pastor: updatedPastor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating pastor'
        });
    }
};

// Eliminar un pastor
const deletePastor = async (req, res) => {
    const { id } = req.params;

    try {
        const pastor = await Pastor.findById(id);

        if (!pastor) {
            return res.status(404).json({
                ok: false,
                msg: 'Pastor not found'
            });
        }

        await Pastor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Pastor deleted'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting pastor'
        });
    }
};

module.exports = {
    createPastor,
    getPastors,
    updatePastor, // Se añadió el método de actualización
    deletePastor
};
