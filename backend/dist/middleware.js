import jwt, {} from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const token = req.cookies.access_token;
    console.log('Token is: ', token);
    if (!token)
        return res.status(401).json({ msg: 'Cookie not found' });
    try {
        if (!process.env.SECRET_KEY)
            throw new Error("Error while validating session");
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.id = payload.id;
        next();
    }
    catch (error) {
        return res.status(401).send('Invalid token');
    }
}
//# sourceMappingURL=middleware.js.map