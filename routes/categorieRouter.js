const express = require('express');

function categoriesRouter(service) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(service.getAll());
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = service.getById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category Not Found' });
    }
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json({ message: 'created', data: newCategory });
  });

  router.patch('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = service.update(id, body);
      res.json({ message: 'updated', data: updatedCategory });
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

module.exports = categoriesRouter;
