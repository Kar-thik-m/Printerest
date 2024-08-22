import express from 'express';
import { Pinmodel } from '../Model/pin.js';
import { authenticateToken } from '../Middleware/Authentication.js';

const router = express.Router();

// POST /pins - Create a new pin
router.post('/pins', authenticateToken, async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        req.body.user = req.user._id;
        const pin = new Pinmodel(req.body);
        await pin.save();

        res.status(201).json(pin);
    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(400).json({ message: error.message });
    }
});

// GET /getallpins - Get all pins
router.get('/getallpins', async (req, res) => {
    try {
        const pins = await Pinmodel.find().populate('user', 'username');
        res.status(200).json(pins);
    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).json({ message: error.message });
    }
});

// GET /:id - Get a pin by ID
router.get('/:id', async (req, res) => {
    try {
        const pin = await Pinmodel.findById(req.params.id).populate('user', 'username');

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        res.status(200).json(pin);
    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).json({ message: error.message });
    }
});

export default router;
