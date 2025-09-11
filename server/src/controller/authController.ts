import { Request, Response } from "express";
import { usernameSchema } from "../lib/zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //validating user input
    usernameSchema.safeParse({name, email, password, confirmPassword});
    if(!usernameSchema){
        return res.status(401).json({mssg:"not valid inputs"})
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ mssg: "passwords do not match" });
    }

    //checking if user exists 
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if(existingUser){
      return res.status(401).json({mssg:"user already exits"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    })

    return res.status(201).json({
        mssg:"user created succesfully",
        user: newUser,
    })

  } catch (error) {
    return res.status(500).json({ mssg: "server error" });
  }
};
