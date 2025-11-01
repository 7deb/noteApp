import { Request,Response } from "express";
import { prisma } from "../lib/prisma";

export const createTask = async (req: Request, res: Response) => {
    try{
        const { title, description , userId } = req.body;
        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                userId
            }
        })
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
}
export const getTask = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const task = await prisma.task.findUnique({
            where:{id:Number(id)}
        })
        if(!task){
            return res.status(404).json({mssg:"Task not found"})
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve task" });
    }
}
