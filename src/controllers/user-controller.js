const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');
const {errorResponse,successResponse}=require('../utils/common');



async function signup(req, res) {
    console.log(req.body);
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        });
        successResponse.message = 'Signed up successfully';
        successResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch(error) {
        console.log(error);
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}
async function signin(req, res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        successResponse.message = 'Logged in successfully';
        successResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch(error) {
        console.log(error);
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}



module.exports = {
    signup,
    signin
}