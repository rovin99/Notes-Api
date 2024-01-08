
const User=require('../models/User');

const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Logger } = require('../config');

class UserRepository {
  
  async create(data) {
    try {
      const response = await User.create(data);
      
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
    const response = await User.findByIdAndDelete(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    const response = await User.findById(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await User.find();
    return response;
  }

  async update(id, data) {
    const response = await User.findByIdAndUpdate(id, data, { new: true });
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }
}



module.exports = UserRepository;