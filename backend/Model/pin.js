import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: {
        id: String,
        url: String,
        hotspot: {
            x: { type: Number, required: false },
            y: { type: Number, required: false },
            width: { type: Number, required: false },
            height: { type: Number, required: false },
        }
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

export const Pinmodel = mongoose.model('Pin', pinSchema);
