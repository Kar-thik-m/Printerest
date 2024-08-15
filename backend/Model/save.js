import mongoose from 'mongoose';

const SaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"User"
    },
    item: {
      type:mongoose.SchemaTypes.ObjectId,
      required: true,
        ref:"Pin"
    },
    
   
});

export const Savemodel = mongoose.model('Save', SaveSchema);
