const express = require('express');

function productsRouter(service) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(service.getAll());
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.getById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json({ message: 'created', data: newProduct });
  });

  router.patch('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = service.update(id, body);
      res.json({ message: 'updated', data: updatedProduct });
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

module.exports = productsRouter;
