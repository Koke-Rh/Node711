const express = require('express');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías
 */
function categoriesRouter(service) {
  const router = express.Router();

  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Obtener todas las categorías
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: Una lista de categorías.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: integer
   *                     description: ID numérico
   *                   categoryName:
   *                     type: string
   *                   description:
   *                     type: string
   *                   active:
   *                     type: boolean
   */
  router.get('/', async (req, res, next) => {
    const categories = await service.getAll();
    res.json(categories);
  });

  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Obtener una categoría por ID
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la categoría
   *     responses:
   *       200:
   *         description: Datos de la categoría
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: integer
   *                 categoryName:
   *                   type: string
   *                 description:
   *                   type: string
   *                 active:
   *                   type: boolean
   *       404:
   *         description: Categoría no encontrada
   */
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const category = await service.getById(id);
    res.json(category);
  });

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Crear una nueva categoría
   *     tags: [Categories]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               categoryName:
   *                 type: string
   *               description:
   *                 type: string
   *               active:
   *                 type: boolean
   *             example:
   *               categoryName: "Electrónica"
   *               description: "Aparatos y gadgets"
   *               active: true
   *     responses:
   *       201:
   *         description: Categoría creada
   */
  router.post('/', async (req, res, next) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({ message: 'created', data: newCategory });
  });

  /**
   * @swagger
   * /categories/{id}:
   *   patch:
   *     summary: Actualizar una categoría
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la categoría
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               categoryName:
   *                 type: string
   *               description:
   *                 type: string
   *               active:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Categoría actualizada
   *       404:
   *         description: Categoría no encontrada
   */
  router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const updatedCategory = await service.update(id, body);
    res.json({ message: 'updated', data: updatedCategory });
  });

  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Eliminar una categoría
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la categoría
   *     responses:
   *       200:
   *         description: Categoría eliminada
   *       404:
   *         description: Categoría no encontrada
   *       409:
   *         description: Conflicto, la categoría está en uso
   */
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({ message: 'deleted', data: result });
  });

  return router;
}

module.exports = categoriesRouter;
