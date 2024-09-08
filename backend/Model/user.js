import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        default: 'user'
    },
  
});
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.SECRET_KEY, {
         expiresIn: process.env.EXPIRES
     })
 }

export const usermodel = mongoose.model('User', userSchema);
