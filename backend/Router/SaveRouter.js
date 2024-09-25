import express from 'express';
import { Savemodel } from '../Model/save.js';

const SaveRouter = express.Router();


SaveRouter.post('/save', async (req, res) => {
    try {
        const {items}=req.body;
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const save = new Savemodel({
            user: req.user.id,
            items: items
        });
        await save.save();
        res.status(201).json(save);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



SaveRouter.get('/save/all', async (req, res) => {
    try {
        const userId = req.user.id;
        if (userId) {
            const saves = await Savemodel.find({ user: userId }) 
                .populate('user', 'username userimage')
                .populate('items', 'title image _id');

            return res.status(200).json(saves); 
        } else {
            return res.status(400).json({ message: 'User not authenticated' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



SaveRouter.get('/save/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const save = await Savemodel.findById(id)
            .populate('user', 'username image.url  _id')
            .populate('items', 'title image comments')


        if (!save) {
            return res.status(404).json({ message: 'Save entry not found' });
        }

        res.status(200).json(save);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


SaveRouter.delete('/unsave/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const save = await Savemodel.findByIdAndDelete(id);

        if (!save) {
            return res.status(404).json({ message: 'Save entry not found' });
        }

        res.status(200).json({ message: 'Save entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default SaveRouter;
