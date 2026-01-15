import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controller/taskController';
import { verifyToken } from '../middleware/middleware';

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/me', verifyToken, getTasks);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;