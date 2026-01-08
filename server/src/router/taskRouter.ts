import express from 'express';
import { createTask, getTasks, updateTask } from '../controller/taskController';
import { verifyToken } from '../middleware/middleware';

const router = express.Router();

router.post('/',createTask);
router.get('/me',verifyToken,getTasks);
router.put('/updateTask',updateTask);

export default router;