const Church = require('../models/church');

// Crear una nueva iglesia
const createChurch = async (req, res) => {
    const { name, address, pastor, country, state, city } = req.body;

    try {
        const church = new Church({
            name,
            address,
            pastor,
            country,
            state,
            city
        });

        await church.save();

        res.json({
            ok: true,
            church
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la iglesia, contacte al administrador'
        });
    }
};

// Obtener todas las iglesias
const getChurches = async (req, res) => {
    try {
        const churches = await Church.find()
            .populate('pastor', 'name lastName degree')
            .populate('country', 'name code')
            .populate('state', 'name')
            .populate('city', 'name');

        res.json({
            ok: true,
            churches
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las iglesias, contacte al administrador'
        });
    }
};

// Actualizar una iglesia
const updateChurch = async (req, res) => {
    const churchId = req.params.id;

    try {
        const updatedChurch = await Church.findByIdAndUpdate(churchId, req.body, { new: true })
            .populate('pastor', 'name lastName degree')
            .populate('country', 'name code')
            .populate('state', 'name')
            .populate('city', 'name');

        res.json({
            ok: true,
            church: updatedChurch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la iglesia, contacte al administrador'
        });
    }
};

// Eliminar una iglesia
const deleteChurch = async (req, res) => {
    const churchId = req.params.id;

    try {
        await Church.findByIdAndDelete(churchId);

        res.json({
            ok: true,
            msg: 'Iglesia eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la iglesia, contacte al administrador'
        });
    }
};

module.exports = {
    createChurch,
    getChurches,
    updateChurch,
    deleteChurch
};
