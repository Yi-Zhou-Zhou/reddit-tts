import e, { Router } from "express";
import { router as authRouter } from "./auth.js";
export const router = e.Router();
router.use('/auth', authRouter);
//# sourceMappingURL=api-router.js.map