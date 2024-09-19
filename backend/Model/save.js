import mongoose from 'mongoose';

const SaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    itemsaved: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin"
    }]
});




export const Savemodel = mongoose.model('Save', SaveSchema);
