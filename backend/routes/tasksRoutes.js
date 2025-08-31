import { Router } from "express";
import { getList, createdTask, updatedTask, toggledTask, removedTask } from "../controllers/taskController.js";

const router = Router();
router.get('/', getList);
router.post('/', createdTask);
router.put ('/:id', updatedTask);
router.delete('/:id', removedTask);
router.patch('/:id/toggle',toggledTask );

export default router;