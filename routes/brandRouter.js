const express = require('express');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gestión de marcas
 */
function brandsRouter(service) {
  const router = express.Router();

  /**
   * @swagger
   * /brands:
   *   get:
   *     summary: Obtener todas las marcas
   *     tags: [Brands]
   *     responses:
   *       200:
   *         description: Una lista de marcas.
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
   *                   brandName:
   *                     type: string
   *                   description:
   *                     type: string
   *                   active:
   *                     type: boolean
   */
  router.get('/', async (req, res, next) => {
    const brands = await service.getAll();
    res.json(brands);
  });

  /**
   * @swagger
   * /brands/{id}:
   *   get:
   *     summary: Obtener una marca por ID
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la marca
   *     responses:
   *       200:
   *         description: Datos de la marca
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: integer
   *                 brandName:
   *                   type: string
   *                 description:
   *                   type: string
   *                 active:
   *                   type: boolean
   *       404:
   *         description: Marca no encontrada
   */
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const brand = await service.getById(id);
    res.json(brand);
  });

  /**
   * @swagger
   * /brands:
   *   post:
   *     summary: Crear una nueva marca
   *     tags: [Brands]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               brandName:
   *                 type: string
   *               description:
   *                 type: string
   *               active:
   *                 type: boolean
   *             example:
   *               brandName: "Nike"
   *               description: "Just Do It"
   *               active: true
   *     responses:
   *       201:
   *         description: Marca creada
   */
  router.post('/', async (req, res, next) => {
    const body = req.body;
    const newBrand = await service.create(body);
    res.status(201).json({ message: 'created', data: newBrand });
  });

  /**
   * @swagger
   * /brands/{id}:
   *   patch:
   *     summary: Actualizar una marca
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la marca
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               brandName:
   *                 type: string
   *               description:
   *                 type: string
   *               active:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Marca actualizada
   *       404:
   *         description: Marca no encontrada
   */
  router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const updatedBrand = await service.update(id, body);
    res.json({ message: 'updated', data: updatedBrand });
  });

  /**
   * @swagger
   * /brands/{id}:
   *   delete:
   *     summary: Eliminar una marca
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico de la marca
   *     responses:
   *       200:
   *         description: Marca eliminada
   *       404:
   *         description: Marca no encontrada
   *       409:
   *         description: Conflicto, la marca está en uso
   */
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({ message: 'deleted', data: result });
  });

  return router;
}

module.exports = brandsRouter;
