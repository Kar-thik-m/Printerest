import express from 'express';
import { Savemodel } from '../Model/save.js';

const SaveRouter = express.Router();

// Create a new save entry
SaveRouter.post('/save', async (req, res) => {
    try {
        console.log('req.user:', req.user);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.body.user = req.user.id;
        const save = new Savemodel(req.body);
        await save.save();
        res.status(201).json(save);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



SaveRouter.get('/save/all', async (req, res) => {
    try {
        const saves = await Savemodel.find()
            .populate('user', 'username')  // Ensure 'user' field is populated
            .populate('items', 'title image');  // Ensure 'items' field is populated

        res.status(200).json(saves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a save entry by ID
SaveRouter.get('/save/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const save = await Savemodel.findById(id)
            .populate('user', 'username')  // Ensure 'user' field is populated
            .populate('items', 'title image');  // Ensure 'items' field is populated

        if (!save) {
            return res.status(404).json({ message: 'Save entry not found' });
        }

        res.status(200).json(save);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default SaveRouter;
