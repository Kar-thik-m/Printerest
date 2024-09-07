import express from 'express';
import { usermodel } from '../Model/user.js'; // Ensure the path is correct
import bcrypt from "bcryptjs"

import { sendToken } from '../Utils/jwt.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const payload = req.body;
        const userCheck = await usermodel.findOne({ email: payload.email })
        if (userCheck) {
            res.status(409).send({ message: "user already exist" })
            return;
        }
        await bcrypt.hash(payload.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).send({ message: "error in encrypting password" })
            }

            const userdata = new usermodel({ ...payload, password: hash });
            await userdata.save();
            
            sendToken(userdata, 201, res);

            res.status(201).send({ message: 'User registered successfully'});
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error registering user details' });
    }
});

userRouter.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const existingUser = await usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        sendToken(existingUser, 201, res);

    } catch (error) {
        res.status(500).send({ message: "Error in logging in" });
    }
});



export default userRouter;
