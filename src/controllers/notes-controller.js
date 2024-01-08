const { StatusCodes } = require('http-status-codes');

const { NoteService } = require('../services');
const { response } = require('express');
const {errorResponse,successResponse}=require('../utils/common');

async function createNote(req, res) {
    
    try {
        console.log(req.body);
        const note = await NoteService.createNote({
            title: req.body.title,
            content: req.body.content,
            ownerId: req.user,
            sharedWith: req.body.sharedWith,
        });
        console.log(note);
        successResponse.message = 'Note created successfully';
        successResponse.data = note;

        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);
                
    } catch (error) {
        console.error('Error in createNote:', error);

        // Set a default status code (e.g., 500 for Internal Server Error)
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

        errorResponse.error = error;
        return res
            .status(statusCode)
            .json(errorResponse);
    }
}


async function getNote(req, res) {
    try {
        
        const note = await NoteService.getNote(req.params.id);
        console.log(note);
        successResponse.message = 'Note fetched successfully';
        successResponse.data=note;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
                
    } catch(error) {
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}

async function destroyNote(req, res) {
    try {
        const response = await NoteService.destroyNote(req.params.id);
        successResponse.message = 'Note deleted successfully';
        successResponse.data=response;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
                
    } catch(error) {
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}

async function updateNote(req, res) {
    try {
        const updateResponse = await NoteService.updateNote(req.params.id, req.body);
        successResponse.message = 'Note updated successfully';
        successResponse.data=updateResponse;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
                
    } catch(error) {
        errorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}
async function getOwnerNotes(req, res) {
    try {
     
      const ownerId = req.user; // Assuming you set the user ID in the middleware
      console.log(ownerId);
      const ownerNotes = await NoteService.getNoteByOwnerId(ownerId);
  
      successResponse.message = 'Owner Notes fetched successfully';
      successResponse.data = ownerNotes;
  
      return res
        .status(StatusCodes.OK)
        .json(successResponse);
    } catch (error) {
      errorResponse.error = error;
      return res
        .status(error.statusCode)
        .json(errorResponse);
    }
  }
  async function shareNote(req, res) {
    console.log(req.params.id);
    console.log(req.body.sharedWith);
    try {
        const note = await NoteService.shareNote(req.body.sharedWith,req.params.id);

        successResponse.message = 'Note shared successfully';
        successResponse.data = note;

        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}

module.exports = {
    createNote,
    getNote,
    destroyNote,
    updateNote,
    getOwnerNotes,
    shareNote
    
}