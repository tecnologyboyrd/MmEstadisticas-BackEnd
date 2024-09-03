const City = require('../models/city');

// Crear una nueva ciudad
const createCity = async (req, res) => {
    const { name, state } = req.body;

    try {
        const city = new City({ name, state });
        await city.save();

        res.json({
            ok: true,
            city
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating city'
        });
    }
};

// Obtener todas las ciudades
const getCities = async (req, res) => {
    try {
        const cities = await City.find().populate('state', 'name').populate({
            path: 'state',
            populate: {
                path: 'country',
                select: 'name code'
            }
        });

        res.json({
            ok: true,
            cities
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error fetching cities'
        });
    }
};

// Eliminar una ciudad
const deleteCity = async (req, res) => {
    const { id } = req.params;

    try {
        const city = await City.findById(id);

        if (!city) {
            return res.status(404).json({
                ok: false,
                msg: 'City not found'
            });
        }

        await City.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'City deleted'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting city'
        });
    }
};

module.exports = {
    createCity,
    getCities,
    deleteCity
};
