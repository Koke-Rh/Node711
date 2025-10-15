const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class brandsService {
  constructor(productsService) {
    this.brands = [];
    this.counter = 0;
    this.productsService = productsService;
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.brands.push({ id: i + 1, brandName: faker.company.name() });
    }
    this.counter = limit;
  }

  create(data) {
    this.counter++;
    const newBrand = { id: this.counter, ...data };
    this.brands.push(newBrand);
    return newBrand;
  }

  getAll() { return this.brands; }
  getById(id) { return this.brands.find(item => item.id == id); }

  update(id, changes) {
    const index = this.brands.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Brand Not Found'); }
    const brand = this.brands[index];
    this.brands[index] = { ...brand, ...changes };
    return this.brands[index];
  }

  delete(id) {
    const allProducts = this.productsService.getAll();
    const brandInUse = allProducts.some(product => product.brandId == id);
    if (brandInUse) {
      throw boom.conflict('Cannot delete brand, it is in use by a product.');
    }
    const index = this.brands.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Brand Not Found'); }
    this.brands.splice(index, 1);
    return { id };
  }
}

module.exports = brandsService;
