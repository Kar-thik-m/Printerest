import express from 'express';
import { usermodel } from '../Model/user.js';
import { Pinmodel } from '../Model/pin.js';

const router = express.Router();

router.post('/pins', async (req, res) => {
    try {
        const { title, image, user } = req.body;

       
        const userExists = await usermodel.findById(user);
        if (!userExists) {
            return res.status(400).json({ message: 'User not found' });
        }

      
        const pin = new Pinmodel({ title, image, user });
       
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
            return res.status(404).json({ message: 'Pin not found' });
        }

        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/pins/save",async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

export default router;