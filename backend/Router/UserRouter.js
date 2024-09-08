import express from 'express';
import { usermodel } from '../Model/user.js'; // Ensure the path is correct
import bcrypt from "bcryptjs"

import { sendToken } from '../Utils/jwt.js';
import { authenticateToken } from '../Middleware/Authentication.js';
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

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const existingUser = await usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Send token and user data
        sendToken(existingUser, 200, res); // Use 200 status code for successful login

    } catch (error) {
        console.error('Login error:', error.message); // Log error message
        res.status(500).json({ message: "Error in logging in" });
    }
});


userRouter.get("/profile", authenticateToken, async (req, res) => {
    try {
       
        const finduser = await usermodel.findById(req.user.id);
        if (!finduser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(finduser);
    } catch (error) {
        res.status(500).send({ message: "user not define" });
    }

})
export default userRouter;
