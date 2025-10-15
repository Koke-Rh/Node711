const { faker } = require('@faker-js/faker');

class usersService {
  constructor() {
    this.users = [];
    this.counter = 0;
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: i + 1,
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      });
    }
    this.counter = limit;
  }

  create(data) {
    this.counter++;
    const newUser = { id: this.counter, ...data };
    this.users.push(newUser);
    return newUser;
  }

  getAll() { return this.users; }
  getById(id) { return this.users.find(item => item.id == id); }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('User Not Found'); }
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1) { throw new Error('User Not Found'); }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = usersService;
