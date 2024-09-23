import mongoose from 'mongoose';

const SaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin"
    }]

});


export const Savemodel = mongoose.model('Save', SaveSchema);
