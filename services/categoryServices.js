const Category = require('../models/category.model');
const { faker } = require('@faker-js/faker');

class categoriesService {
  constructor() {
    this.generate();
  }

  setDependencies(productsService) {
    this.productsService = productsService;
  }

  async getNextId() {
    const lastItem = await Category.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
  }

  async generate() {
    const count = await Category.countDocuments();
    if (count > 0) return;

    for (let i = 0; i < 5; i++) {
      const newCategory = new Category({
        _id: i + 1,
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
        active: true
      });
      await newCategory.save();
    }
    console.log('✅ Categorías falsas generadas en MongoDB');
  }

  async create(data) {
    const newId = await this.getNextId();
    const newCategory = new Category({ _id: newId, ...data });
    await newCategory.save();
    return newCategory;
  }

  async getAll() { return await Category.find(); }

  async getById(id) {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    return category;
  }

  async update(id, changes) {
    const updatedCategory = await Category.findByIdAndUpdate(id, changes, { new: true });
    if (!updatedCategory) {
      const error = new Error('Category Not Found');
      error.statusCode = 404;
      throw error;
    }
    return updatedCategory;
  }

  async delete(id) {
    const productsInUse = await this.productsService.find({ categoryId: id });
    if (productsInUse.length > 0) {
      const error = new Error('Cannot delete category, it is in use by a product.');
      error.statusCode = 409;
      throw error;
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      const error = new Error('Category Not Found');
      error.statusCode = 404;
      throw error;
    }
    return { id };
  }
}

module.exports = categoriesService;
