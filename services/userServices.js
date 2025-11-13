const User = require('../models/user.model');
const { faker } = require('@faker-js/faker');

class usersService {
  constructor() {
    this.generate(); // Intenta generar datos al iniciar
  }

  async getNextId() {
    const lastItem = await User.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
  }

  async generate() {
    const count = await User.countDocuments();
    if (count > 0) return; // Si ya hay datos en Mongo, no hace nada

    for (let i = 0; i < 10; i++) {
      const newUser = new User({
        _id: i + 1,
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      });
      await newUser.save();
    }
    console.log('✅ Usuarios falsos generados en MongoDB');
  }

  async create(data) {
    const newId = await this.getNextId();
    const newUser = new User({ _id: newId, ...data });
    await newUser.save();
    newUser.password = undefined;
    return newUser;
  }

  async getAll() {
    return await User.find().select('-password');
  }

  async getById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async update(id, changes) {
    const updatedUser = await User.findByIdAndUpdate(id, changes, { new: true }).select('-password');
    if (!updatedUser) {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      throw error;
    }
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      throw error;
    }
    return { id };
  }
}

module.exports = usersService;
