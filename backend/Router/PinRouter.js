import express from 'express';

import { Pinmodel } from '../Model/pin.js';
import { authenticateToken } from '../Middleware/Authentication.js';
const router = express.Router();

router.post('/pins',authenticateToken, async (req, res) => {
    try {
     
        req.body.user = req.user._id;
        const pin = new Pinmodel(req.body);
        await pin.save();

        res.status(201).json(pin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all pins
router.get('/getallpins', async (req, res) => {
    try {
        const pins = await Pinmodel.find().populate('user', 'username');
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a pin by ID
router.get('/:id', async (req, res) => {
    try {
        const pin = await Pinmodel.findById(req.params.id).populate('user', 'username');

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found here' });
        }

        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;