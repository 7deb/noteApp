import { Request,Response } from "express";
import { prisma } from "../lib/prisma";
 
export const createTask = async (req: Request, res: Response) => {
    try{
        const { title, description , userId } = req.body;
        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                userId: Number(userId)
            }
        })
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
}
export const getTasks = async (req:Request,res:Response)=>{
    try{
        const userId  = (req as any).userId;
        const tasks = await prisma.task.findMany({
            where:{userId}
        })
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({ error: "Failed to retrieve tasks" });
    }
}
export const updateTask = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const {title,description,completed} = req.body;
        const updatedTask = await prisma.task.update({
            where:{id:Number(id)},
            data:{
                title,
                description,
                completed
            }
        });
        res.status(200).json(updatedTask);
    }catch(error){
        res.status(500).json({ error: "server error",
            details: error
         });
    }
}