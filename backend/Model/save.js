import { request } from 'express';
import mongoose from 'mongoose';

const SaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ownuserId: {
        type: String
    },
    ownusername: {
        type: String
    },
    ownuserimage: {
        type: String
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        request: true,
        ref: "Pin"
    }]

});


export const Savemodel = mongoose.model('Save', SaveSchema);
