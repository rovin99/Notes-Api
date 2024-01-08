
const Note=require('../models/Note');


const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Logger } = require('../config');

class NoteRepository {
  
  async create(data) {
    try {
      const response = await Note.create(data);
      
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
    const response = await Note.findByIdAndDelete(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    const response = await Note.findById(id);
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await Note.find();
    return response;
  }

  async update(id, data) {
    const response = await Note.findByIdAndUpdate(id, data, { new: true });
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async getNoteByOwnerId(ownerId) {
    const ownernote = await Note.find( { ownerId: ownerId } );
    console.log(ownernote);
    return ownernote;
  }
  async getOwnnerId(id) {
    try {
      const note = await Note.findById(id);
      if (!note) {
        throw new AppError('Note not found', StatusCodes.NOT_FOUND);
      }
      return note.ownerId;
    } catch (error) {
      throw new AppError('Cannot get owner ID', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }



}



module.exports = NoteRepository;