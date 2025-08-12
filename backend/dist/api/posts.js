import e, { Router } from "express";
import { authMiddleware } from "../middleware.js";
export const router = e();
router.get('/', authMiddleware, (req, res) => {
    console.log("test");
    res.send("posts endpoint");
});
//# sourceMappingURL=posts.js.map