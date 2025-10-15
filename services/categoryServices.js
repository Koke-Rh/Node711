const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class categoriesService {
  constructor(productsService) {
    this.categories = [];
    this.counter = 0;
    this.productsService = productsService;
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({ id: i + 1, categoryName: faker.commerce.department() });
    }
    this.counter = limit;
  }

  create(data) {
    this.counter++;
    const newCategory = { id: this.counter, ...data };
    this.categories.push(newCategory);
    return newCategory;
  }

  getAll() { return this.categories; }
  getById(id) { return this.categories.find(item => item.id == id); }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Category Not Found'); }
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  delete(id) {
    const allProducts = this.productsService.getAll();
    const categoryInUse = allProducts.some(product => product.categoryId == id);
    if (categoryInUse) {
      throw boom.conflict('Cannot delete category, it is in use by a product.');
    }
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Category Not Found'); }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = categoriesService;
