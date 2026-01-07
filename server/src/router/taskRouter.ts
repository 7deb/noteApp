import express from 'express';
import { createTask, getTasksbyuser, updateTask } from '../controller/taskController';

const router = express.Router();

router.post('/',createTask);
router.get('/user/:userId',getTasksbyuser);
router.put('/:id',updateTask);
export default router;