import express from 'express';
import { createTask, getTask } from '../controller/taskController';

const router = express.Router();

router.post('/',createTask);
router.get('/:id',getTask);
export default router;