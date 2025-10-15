const { faker } = require('@faker-js/faker');

class productsService {
  constructor() {
    this.products = [];
    this.counter = 0;
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        categoryId: faker.number.int({ min: 1, max: 5 }),
        brandId: faker.number.int({ min: 1, max: 5 })
      });
    }
    this.counter = limit;
  }

  create(data) {
    this.counter++;
    const newProduct = { id: this.counter, ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  getAll() { return this.products; }
  getById(id) { return this.products.find(item => item.id == id); }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Product Not Found'); }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('Product Not Found'); }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = productsService;
