const express = require('express');

function moviesRouter(service) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(service.getAll());
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = service.getById(id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'PELICULA NO ECONTRADA' });
    }
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const newMovie = service.create(body);
    res.status(201).json({ message: 'created', data: newMovie });
  });

  router.patch('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedMovie = service.update(id, body);
      res.json({ message: 'updated', data: updatedMovie });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.delete('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const result = service.delete(id);
      res.json({ message: 'deleted', data: result });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  return router;
}

module.exports = moviesRouter;
