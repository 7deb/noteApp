import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../lib/zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { tokenGen } from "../utils/generateToken";

interface AuthReq extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Correcting validation check
    const validationResult = signupSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!validationResult.success) {
      return res
        .status(401)
        .json({
          mssg: "not valid inputs",
          errors: validationResult.error.issues,
        });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ mssg: "passwords do not match" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(401).json({ mssg: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //token generator
    tokenGen(newUser.id.toString(), res);

    return res.status(201).json({
      mssg: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error); // Log the actual error
    return res.status(500).json({ mssg: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Correcting validation check
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return res
        .status(401)
        .json({
          mssg: "invalid inputs",
          errors: validationResult.error.issues,
        });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({ mssg: "user does not exist" });
    }

    const isvalidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isvalidPassword) {
      return res.status(401).json({ mssg: "invalid password" });
    }

    // converting id which is a number to string because tokengen as it excepts strings
    tokenGen(existingUser.id.toString(), res);

    return res.status(201).json({
      mssg: "user logged in",
      user: existingUser,
    });
  } catch (error) {
    if (!res.headersSent) {
      console.error("Login error:", error);
      return res.status(500).json({ mssg: "server error" });
    }
  }
};

export const getCurrentUser = (req: AuthReq, res: Response) => {
  const user = req.user;
  if (user) {

    tokenGen(user.id.toString(), res);
  }
  if (!user) {
    return res.status(401).json({ mssg: "not authenticated!!" });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mssg: "internal server issue" });
  }
};
