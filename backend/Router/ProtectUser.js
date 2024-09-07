import { usermodel } from "../Model/user.js";
import express from 'express';
const ProtuctRouter = express.Router();
ProtuctRouter.get("/profile", async (req, res) => {
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
export default ProtuctRouter;