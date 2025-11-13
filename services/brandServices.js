const Brand = require('../models/brand.model');
const { faker } = require('@faker-js/faker');

class brandsService {
  constructor() {
    this.generate();
  }

  setDependencies(productsService) {
    this.productsService = productsService;
  }

  async getNextId() {
    const lastItem = await Brand.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
  }

  async generate() {
    const count = await Brand.countDocuments();
    // Si ya hay marcas en la base de datos, no hace nada
    if (count > 0) return;

    for (let i = 0; i < 5; i++) {
      const newBrand = new Brand({
        _id: i + 1, // IDs: 1, 2, 3, 4, 5
        brandName: faker.company.name(),
        description: faker.lorem.sentence(),
        active: true
      });
      await newBrand.save();
    }
    console.log('✅ Marcas falsas generadas en MongoDB');
  }

  async create(data) {
    const newId = await this.getNextId();
    const newBrand = new Brand({
      _id: newId,
      ...data
    });
    await newBrand.save();
    return newBrand;
  }

  async getAll() {
    return await Brand.find();
  }

  async getById(id) {
    const brand = await Brand.findById(id);
    if (!brand) {
      const error = new Error('Brand not found');
      error.statusCode = 404;
      throw error;
    }
    return brand;
  }

  async update(id, changes) {
    const updatedBrand = await Brand.findByIdAndUpdate(id, changes, { new: true });
    if (!updatedBrand) {
      const error = new Error('Brand Not Found');
      error.statusCode = 404;
      throw error;
    }
    return updatedBrand;
  }

  async delete(id) {
    // Integridad referencial
    const productsInUse = await this.productsService.find({ brandId: id });

    if (productsInUse.length > 0) {
      const error = new Error('Cannot delete brand, it is in use by a product.');
      error.statusCode = 409;
      throw error;
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      const error = new Error('Brand Not Found');
      error.statusCode = 404;
      throw error;
    }
    return { id };
  }
}

module.exports = brandsService;
