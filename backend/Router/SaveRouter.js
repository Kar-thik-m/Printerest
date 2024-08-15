import express from "express";
import { Savemodel } from "../Model/save.js";

const SaveRouter = express.Router();


SaveRouter.post('/save', async (req, res) => {
    try {
        const { user, item } = req.body;

        const existingSave = await Savemodel.findOne({ user, item })
            .populate('user', 'username')
            .populate('item', 'title image');
        if (existingSave) {
            return res.status(400).json({ message: 'Item already saved' });
        }


        const save = new Savemodel({ user, item });
        await save.save();

        res.status(201).json(save);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

SaveRouter.delete('/save-delete', async (req, res) => {
    try {
        const { user, item } = req.body;

 
        const result = await Savemodel.deleteOne({ user, item });

        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found or already deleted' });
        }

        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


SaveRouter.get('/save/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

       
        const savedItems = await Savemodel.find({ user: userId })
            .populate('user', 'username') 
            .populate('item', 'title image'); 

       
        res.status(200).json(savedItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default SaveRouter;