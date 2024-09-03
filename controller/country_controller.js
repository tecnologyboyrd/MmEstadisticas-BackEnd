const Country = require('../models/country');

// Crear un nuevo país
const createCountry = async (req, res) => {
    const { name, code } = req.body;

    try {
        const country = new Country({ name, code });
        await country.save();

        res.json({
            ok: true,
            country
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating country'
        });
    }
};

// Obtener todos los países
const getCountries = async (req, res) => {
    try {
        const countries = await Country.find();

        res.json({
            ok: true,
            countries
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error fetching countries'
        });
    }
};

// Actualizar un país
const updateCountry = async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;

    try {
        const updatedCountry = await Country.findByIdAndUpdate(
            id,
            { name, code },
            { new: true } // Para devolver el documento actualizado
        );

        if (!updatedCountry) {
            return res.status(404).json({
                ok: false,
                msg: 'Country not found'
            });
        }

        res.json({
            ok: true,
            country: updatedCountry
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error updating country'
        });
    }
};

// Eliminar un país
const deleteCountry = async (req, res) => {
    const { id } = req.params;

    try {
        const country = await Country.findById(id);

        if (!country) {
            return res.status(404).json({
                ok: false,
                msg: 'Country not found'
            });
        }

        await Country.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Country deleted'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error deleting country'
        });
    }
};

module.exports = {
    createCountry,
    getCountries,
    updateCountry,  // Asegúrate de exportar el método aquí
    deleteCountry
};
