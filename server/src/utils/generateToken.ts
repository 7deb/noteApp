import jwt from "jsonwebtoken";
import { Response } from "express";

export const tokenGen = (userid: string, res: Response) => {
  const secret = process.env.SECRET || "default_secret";

  const token = jwt.sign({ userId: userid }, secret, { expiresIn: "1h" });

  res.json({ token });
};