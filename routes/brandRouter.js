const express = require('express');

function brandsRouter(service) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(service.getAll());
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = service.getById(id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: 'Brand Not Found' });
    }
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const newBrand = service.create(body);
    res.status(201).json({ message: 'created', data: newBrand });
  });

  router.patch('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedBrand = service.update(id, body);
      res.json({ message: 'updated', data: updatedBrand });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.delete('/:id', (req, res, next) => {
    try {
      const { id } = req.params;
      const result = service.delete(id);
      res.json({ message: 'deleted', data: result });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = brandsRouter;
