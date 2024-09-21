import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: {
        id: String,
        url: String,

    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        
    }],
    
});

export const Pinmodel = mongoose.model('Pin', pinSchema);
