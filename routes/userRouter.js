const express = require('express');

function usersRouter(service) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(service.getAll());
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = service.getById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User Not Found' });
    }
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json({ message: 'created', data: newUser });
  });

  router.patch('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = service.update(id, body);
      res.json({ message: 'updated', data: updatedUser });
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

module.exports = usersRouter;
