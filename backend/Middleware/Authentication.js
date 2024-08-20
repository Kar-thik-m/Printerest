import jwt from 'jsonwebtoken';
import { usermodel } from '../Model/user.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send({ message: 'Access denied, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await usermodel.findById(decoded.userId);

        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).send({ message: 'Invalid or expired token' });
    }
};
