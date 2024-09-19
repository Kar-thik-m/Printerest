import express from 'express';
import { usermodel } from '../Model/user.js';
import bcrypt from "bcryptjs"
import uploadFile from '../Utils/multerAccess.js';
import getUrl from '../Utils/urlgenerator.js';
import cloudinary from "cloudinary"
import { sendToken } from '../Utils/jwt.js';
import { authenticateToken } from '../Middleware/Authentication.js';
const userRouter = express.Router();


userRouter.post('/register', uploadFile, async (req, res) => {
    try {
        const payload = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileurl = getUrl(file);
        const cloud = await cloudinary.v2.uploader.upload(fileurl.content);

        const userCheck = await usermodel.findOne({ email: payload.email });
        if (userCheck) {
            return res.status(409).json({ message: "User already exists" });
        }

        
        const hash = await bcrypt.hash(payload.password, 10);

        const userdata = new usermodel({
            ...payload,
            password: hash,
            userimage: { id: cloud.public_id, url: cloud.secure_url }
        });

        await userdata.save();

        sendToken(userdata, 201, res);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error registering user details' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const existingUser = await usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }


        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }


        sendToken(existingUser, 200, res);

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: "Error in logging in" });
    }
});



userRouter.get('/profile', authenticateToken, async (req, res) => {
    try {

        const finduser = await usermodel.findOne({ email: req.user.email });

        if (!finduser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(finduser);
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
});
export default userRouter;
