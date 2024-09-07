
export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    const options = {
        expires: new Date(
            Date.now() + (parseInt(process.env.COOKIE_EXPIRES_TIME, 10) || 1) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        });
};



