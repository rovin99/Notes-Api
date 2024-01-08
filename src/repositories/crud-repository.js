const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Logger } = require('../config');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model(data).save();
      
      return response;
    } catch (error) {
      Logger.error('Error in create method:', error);
      if (error.name === 'ValidationError') {
        throw new AppError('Validation failed', StatusCodes.BAD_REQUEST);
      }
      throw new AppError('Failed to create resource', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await this.model.find();
    return response;
  }

  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = CrudRepository;
