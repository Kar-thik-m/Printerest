import jwt from 'jsonwebtoken'; 



export const generateToken = (user) => {
   
    if (!user || !user.userId) {
        throw new Error('Invalid user data');
    }

    return jwt.sign(
        { userId: user.userId }, 
        process.env.SECRET_KEY, 
        { expiresIn: process.env.EXPIRES || '1d' } 
    );
};
