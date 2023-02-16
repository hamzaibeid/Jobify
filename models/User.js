import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true , 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: { 
        type: String,
        required: [true , 'Please provide email'],
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: 'please provide a valid email'
        },
    },
    password: { 
        type: String,
        required: [true , 'Please provide password'],
        minlength: 6,
        select: false 
    },
    lastname: { 
        type: String,
        maxlength: 20,
        trim: true,
        default: 'last name'
    },
    location: { 
        type: String,
        maxlength: 20,
        trim: true,
        default: 'My city'
    },
    
});
 UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn: '1d'});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}




export default mongoose.model('User',UserSchema);