import express from 'express';
import { usermodel } from '../Model/user.js'; // Ensure the path is correct


const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const payload = req.body;


        const userdata = new usermodel({ ...payload });
        await userdata.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error registering user details' });
    }
});

export default userRouter;
