const { StatusCodes } = require('http-status-codes');

const { errorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');
function validateAuthRequest(req, res,next) {
    if(!req.body.email){
        errorResponse.message='Something went wrong while creating a new User'
        errorResponse.error={
            explanation: 'Email not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.password){
        errorResponse.message='Something went wrong while creating a new User'
        errorResponse.error={
            explanation: 'Password not found in the request in correct format'
        };
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}
async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response; // setting the user id in the req object
            console.log(req.uer);
            next();
        }
    } catch(error) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error);
    }

    
    
}
module.exports = {
    validateAuthRequest,
    checkAuth
}
