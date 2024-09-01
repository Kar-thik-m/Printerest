import express from 'express';
import { usermodel } from '../Model/user.js'; // Ensure the path is correct
import bcrypt from "bcryptjs"
import { generateToken } from '../Utils.js';
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
          
            const token = generateToken({ userId: userdata._id });
            try {
                res.cookie('token', token, {
                    httpOnly: true,
                    expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
                ),
                });
               } catch (error) {
                res.send("cookies Error",error)
               }
            await userdata.save();
            res.status(201).send({ message: 'User registered successfully',token });
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

       await bcrypt.compare(password, existingUser.password, function (err, result) {
            if (err) {
                return res.status(500).send({ message: "Error in comparing passwords" });
            }
            if (!result) {
                return res.status(401).send({ message: "Incorrect password" });
            }
            const token = generateToken({ userId: existingUser._id });
           try {
            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
            ),
            });
           } catch (error) {
            res.send("cookies Error",error)
           }
            res.send({ message: "Login successful",token,existingUser });

        });
    } catch (error) {

        res.status(500).send({ message: "Error in logging in" });
    }
});


userRouter.get("/profile",async (req,res)=>{
    try {
        const finduser= usermodel.findById(req.user._id);
        if (!finduser) {
            return res.status(404).json({ message: "User not found" }); 
        }
        res.status(200).json(finduser);
    } catch (error) {
        res.status(500).send({ message: "user not define" });
    }

})
export default userRouter;
