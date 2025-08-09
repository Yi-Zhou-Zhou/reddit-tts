import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"

interface customJWTPayload extends JwtPayload {
  id: string
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
  const token = req.cookies.token;
  console.log(token)
  if (!token) return res.status(401).json({msg: 'Cookie not found'})

  try {
    if (!process.env.SECRET_KEY) throw new Error("Error while validating session")
    const payload = jwt.verify(token, process.env.SECRET_KEY) as customJWTPayload
    req.id = payload.id
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
}