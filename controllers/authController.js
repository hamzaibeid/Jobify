import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
import {BadRequestError,UnAuthenticated} from '../errors/index.js'
import { last } from 'mongoose/lib/utils.js';

const register = async(req,res,next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError('please provide all values');
    }
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            throw new BadRequestError('Email already exists');
        }
        const user = await User.create({
            "name": name,
            "email": email,
            "password": password
        });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({user:{
            email:user.email,
            lastName:user.lastname, 
            location:user.location,
            name:user.name
        },
            token,location:user.location
        }); 
};

const loginUser = async(req,res) => {
    res.send('login'); 
    const {email,password} = req.body;
    if(!email || !password){
         console.log(req.body);
         throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new UnAuthenticated('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticated('Invalid Credentials');
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user,token, location:user.location});
    res.send('login'); 
};

const updateUser = async(req,res) => {
    res.send('updateUser');
}

export {register, loginUser, updateUser};