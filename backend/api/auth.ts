import e, { Router } from "express";
import { connection } from "../database.js";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import type { RegisterBody, LoginBody } from "../types/auth.js";
import type { Request, Response } from "express";
export const router: Router = e();

router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { email, password, confirm_password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Incomplete credentials" });
    }

    try {
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT 1 FROM user WHERE email = ? LIMIT 1",
        [email]
      );
      if (rows.length > 0) {
        return res
          .status(409)
          .json({ error: "The email is already being used" });
      }

      const hashed_password = await bcrypt.hash(password, 10);
      const id = uuidv4();
      await connection.execute(
        "INSERT INTO user(id, email, password) VALUES(?,?,?)",
        [id, email, hashed_password]
      );
      if (!process.env.SECRET_KEY) {
        throw new Error("Error while creating token");
      }
      const token = jwt.sign({ id: id, email: email }, process.env.SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      return res.status(201).json({ msg: "User created" });
    } catch (error) {
      return res.status(500).json({ error });
    }
    // Checkear que el email no este dentro de la bbdd
  }
);

router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Incomplete credentials" });
    }
    try {
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * from user WHERE email = ? LIMIT 1",
        [email]
      );
      if (rows.length <= 0) {
        // No user found
        return res.status(401).json({ error: "No user found" });
      }
      const user = rows[0];
      const areEqual = await bcrypt.compare(password, user?.password);
      if (areEqual) {
        if (!process.env.SECRET_KEY) {
          throw new Error("Error while creating token");
        }
        const access_token = jwt.sign(
          { id: user?.id, email: user?.email },
          process.env.SECRET_KEY
        );
        const refresh_token = jwt.sign(
          { id: user?.id },
          process.env.SECRET_KEY
        );

        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: process.env.ENVIRONMENT === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: process.env.ENVIRONMENT === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ data: { email, access_token } });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return res.status(401).json({ err: "Invalid credentials" });
    }
  }
);
