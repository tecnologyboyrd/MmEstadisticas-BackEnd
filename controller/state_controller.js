const State = require('../models/state');

// Crear un nuevo estado
const createState = async (req, res) => {
    const { name, country } = req.body;

    try {
        const state = new State({ name, country });
        await state.save();

        res.json({
            ok: true,
            state
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating state'
        });
    }
};

// Obtener todos los estados
const getStates = async (req, res) => {
    try {
        const states = await State.find().populate('country', 'name code');

        res.json({
            ok: true,
            states
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error fetching states'
        });
    }
};

// Eliminar un estado
const deleteState = async (req, res) => {
    const { id } = req.params;

    try {
        const state = await State.findById(id);

        if (!state) {
            return res.status(404).json({
                ok: false,
                msg: 'State not found'
            });
        }

        await State.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'State deleted'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting state'
        });
    }
};

module.exports = {
    createState,
    getStates,
    deleteState
};
