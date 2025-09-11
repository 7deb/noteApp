import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
const JWT_SECRET = process.env.secret || "secret";

interface JwtPayload {
  userId: number;
}

export const verifyToken = async (req: Request,res: Response,next: NextFunction) => {
  try {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ mssg: "no token provided auth failed!!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.userId) },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    (req as any).user = user;

    next();
  } catch (error: any) {
    console.error("Auth error:", error.message);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
      return;
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
      return;
    } else {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
};
