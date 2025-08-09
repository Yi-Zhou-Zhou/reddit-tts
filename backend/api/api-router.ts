import e, {Router} from "express";
import { router as authRouter } from "./auth.js";
export const router : Router = e.Router()

router.use('/auth', authRouter)