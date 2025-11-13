const express = require('express');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */
function productsRouter(service) {
  const router = express.Router();

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: Obtener todos los productos
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: Una lista de productos.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   price:
   *                     type: integer
   *                   image:
   *                     type: string
   *                   categoryId:
   *                     type: integer
   *                   brandId:
   *                     type: integer
   */
  router.get('/', async (req, res, next) => {
    const product = await service.getAll();
    res.json(product);
  });

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Obtener un producto por ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del producto
   *     responses:
   *       200:
   *         description: Datos del producto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 price:
   *                   type: integer
   *                 image:
   *                   type: string
   *                 categoryId:
   *                   type: integer
   *                 brandId:
   *                   type: integer
   *       404:
   *         description: Producto no encontrado
   */
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await service.getById(id);
    res.json(product);
  });

  /**
   * @swagger
   * /products:
   *   post:
   *     summary: Crear un nuevo producto
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: integer
   *               image:
   *                 type: string
   *               categoryId:
   *                 type: integer
   *               brandId:
   *                 type: integer
   *             example:
   *               name: "Producto Nuevo"
   *               price: 150
   *               image: "http://placeimg.com/640/480/any"
   *               categoryId: 1
   *               brandId: 1
   *     responses:
   *       201:
   *         description: Producto creado exitosamente
   */
  router.post('/', async (req, res, next) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({ message: 'created', data: newProduct });
  });

  /**
   * @swagger
   * /products/{id}:
   *   patch:
   *     summary: Actualizar un producto parcialmente
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del producto
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: integer
   *               image:
   *                 type: string
   *               categoryId:
   *                 type: integer
   *               brandId:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Producto actualizado
   *       404:
   *         description: Producto no encontrado
   */
  router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id, body);
    res.json({ message: 'updated', data: updatedProduct });
  });

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Eliminar un producto
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: El ID numérico del producto
   *     responses:
   *       200:
   *         description: Producto eliminado
   *       404:
   *         description: Producto no encontrado
   */
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json({ message: 'deleted', data: result });
  });

  return router;
}

module.exports = productsRouter;
