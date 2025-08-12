import e, { Router } from "express";
import { authMiddleware } from "../middleware.js";
import jwt from "jsonwebtoken";
import { connection } from "../database.js";
export const router = e();
router.use("/me", authMiddleware, (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!process.env.SECRET_KEY)
            throw new Error("Error while validating session");
        const { id, email } = jwt.verify(token, process.env.SECRET_KEY);
        const new_token = jwt.sign({ id, email }, process.env.SECRET_KEY);
        res.cookie('access_token', new_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.ENVIRONMENT === "production",
            maxAge: 1000 * 60 * 15
        });
        res.status(200).json({ data: { email, access_token: new_token } });
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
//# sourceMappingURL=users.js.map