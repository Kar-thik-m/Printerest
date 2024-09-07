import jwt from 'jsonwebtoken';
import { usermodel } from '../Model/user.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await usermodel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token authentication error:', error.message);


    }
};
