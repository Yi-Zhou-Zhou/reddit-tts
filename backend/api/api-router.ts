import e, {Router} from "express";
import { router as authRouter } from "./auth.js";
import {router as postsRouter} from './posts.js'
import { router as usersRouter } from "./users.js";
export const router : Router = e.Router()

router.use('/auth', authRouter)
router.use('/posts', postsRouter)   
router.use('/users', usersRouter)