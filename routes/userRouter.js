const express = require('express');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */
function usersRouter(service) {
  const router = express.Router();

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Obtener todos los usuarios
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Una lista de usuarios.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   username:
   *                     type: string
   */
  router.get('/', async (req, res, next) => {
    const users = await service.getAll();
    res.json(users);
  });

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Obtener un usuario por ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del usuario
   *     responses:
   *       200:
   *         description: Datos del usuario
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 username:
   *                   type: string
   *       404:
   *         description: Usuario no encontrado
   */
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = await service.getById(id);
    res.json(user);
  });

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Crear un nuevo usuario
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *             example:
   *               name: "Juan Pérez"
   *               username: "juanperez"
   *               password: "123456"
   *     responses:
   *       201:
   *         description: Usuario creado
   */
  router.post('/', async (req, res, next) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({ message: 'created', data: newUser });
  });

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Actualizar un usuario parcialmente
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               username:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuario actualizado
   *       404:
   *         description: Usuario no encontrado
   */
  router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await service.update(id, body);
    res.json({ message: 'updated', data: updatedUser });
  });

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Eliminar un usuario
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del usuario
   *     responses:
   *       200:
   *         description: Usuario eliminado
   *       404:
   *         description: Usuario no encontrado
   */
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({ message: 'deleted', data: result });
  });

  return router;
}

module.exports = usersRouter;
