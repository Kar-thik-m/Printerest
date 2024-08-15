import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   
});

export const Pinmodel= mongoose.model('Pin', pinSchema);
