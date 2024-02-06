const { User } = require('../models/user');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const userService = require('./user.service');

const createUser = async (email, password) => {
    try {
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, the email has been registered')
        }

        const user = new User({
            email,
            password
        });
        await user.save();
        return user;

    } catch (error) {
        throw error;
    }
}

const signInVerify = async (email, password) => {
    try{
        const user = await userService.findByEmail(email)
        if(!user){
            throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry bad email");
        }
        if(!(await user.comparePassword(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry bad password");
        }
        return user
    }catch(error){
        throw error
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken()
    return token
}

module.exports =
{
    createUser,
    genAuthToken,
    signInVerify,
}