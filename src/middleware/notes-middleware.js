const { StatusCodes } = require('http-status-codes');
//const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/common');
const { NoteService } = require('../services');
function validateCreateNote(req, res, next) {
  console.log('Request Body:', req.body);
  if(!req.body.title){
    errorResponse.message='Something went wrong while creating a new Note'
    errorResponse.error={
        explanation: 'title not found in the request in correct format'
    };
    return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse);
  }

  if(!req.body.content){
    errorResponse.message='Something went wrong while creating a new Note'
    errorResponse.error={
        explanation: 'content not found in the request in correct format'
    };
    return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse);
  }
  

 
  next();
}


const authenticateOwner= async (req, res, next) => {
    console.log("hi");
    const ownerId = await NoteService.getOwnnerId(req.params.id);
    if (req.user == ownerId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports = {
    validateCreateNote, 
   
    authenticateOwner
}
