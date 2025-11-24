const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// 1. OBTENER TODOS (GET)
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. GUARDAR NUEVO (POST)
router.post('/', async (req, res) => {
    const { name, description, latitude, longitude } = req.body;
    try {
        const place = new Place({
            name,
            description,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // Mongo es [lng, lat]
            }
        });
        const savedPlace = await place.save();
        res.json(savedPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. EDITAR POR ID (PUT) - ¡NUEVO!
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, latitude, longitude } = req.body;

    try {
        // Buscamos y actualizamos
        const updatedPlace = await Place.findByIdAndUpdate(id, {
            name,
            description,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        }, { new: true }); // {new: true} devuelve el dato ya actualizado

        res.json(updatedPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. BORRAR POR ID (DELETE) - ¡NUEVO!
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Place.findByIdAndDelete(id);
        res.json({ message: 'Lugar eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
