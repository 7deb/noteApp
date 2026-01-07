import jwt from "jsonwebtoken";
import { Response } from "express";
import { JWT_SECRET } from "../config/password";

export const tokenGen = (userid: string, res: Response) => {

  const token = jwt.sign({ userId: userid }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
  });
};
