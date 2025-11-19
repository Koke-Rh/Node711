const express = require('express');
const router = express.Router();
const Place = require('../models/Place'); // Asegúrate que la ruta al modelo sea correcta

// RUTA GET: Obtener todos los lugares
router.get('/', async (req, res) => {
    try {
        // Busca todos los lugares en la base de datos
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// RUTA POST: Guardar un nuevo lugar
router.post('/', async (req, res) => {
    const { name, description, latitude, longitude } = req.body;

    try {
        const place = new Place({
            name,
            description,
            location: {
                type: 'Point',
                // OJO: MongoDB espera [longitud, latitud] en ese orden
                coordinates: [longitude, latitude]
            }
        });

        const savedPlace = await place.save();
        res.json(savedPlace);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
