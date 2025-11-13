const Product = require('../models/product.model');
const { faker } = require('@faker-js/faker');

class productsService {
  constructor() {
    this.generate();
  }

  setDependencies(categoriesService, brandsService) {
    this.categoriesService = categoriesService;
    this.brandsService = brandsService;
  }

  async getNextId() {
    const lastItem = await Product.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
  }

  async generate() {
    const count = await Product.countDocuments();
    if (count > 0) return;

    // Esperamos 2 segundos para que se creen las Categorías y Marcas primero
    setTimeout(async () => {
      for (let i = 0; i < 10; i++) {
        const newProduct = new Product({
          _id: i + 1,
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.url(),
          // Usamos IDs del 1 al 5 porque sabemos que los otros servicios los crearán
          categoryId: faker.number.int({ min: 1, max: 5 }),
          brandId: faker.number.int({ min: 1, max: 5 })
        });
        await newProduct.save();
      }
      console.log('✅ Productos falsos generados en MongoDB');
    }, 2000);
  }

  async create(data) {
    await this.categoriesService.getById(data.categoryId);
    await this.brandsService.getById(data.brandId);

    const newId = await this.getNextId();
    const newProduct = new Product({ _id: newId, ...data });
    await newProduct.save();
    return newProduct;
  }

  async getAll() {
    return await Product.find().populate('categoryId').populate('brandId');
  }

  async getById(id) {
    const product = await Product.findById(id).populate('categoryId').populate('brandId');
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async update(id, changes) {
    const updatedProduct = await Product.findByIdAndUpdate(id, changes, { new: true });
    if (!updatedProduct) {
      const error = new Error('Product Not Found');
      error.statusCode = 404;
      throw error;
    }
    return updatedProduct;
  }

  async delete(id) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      const error = new Error('Product Not Found');
      error.statusCode = 404;
      throw error;
    }
    return { id };
  }

  async find(query) {
    return await Product.find(query);
  }
}

module.exports = productsService;
