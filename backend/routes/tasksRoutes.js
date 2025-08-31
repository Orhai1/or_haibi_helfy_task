import { Router } from "express";
import { getTasks, createTask, updateTask, removeTask } from "../server";

const router = Router();
router.get('/', getTasks);
router.post('/', getTasks);
router.put ('/:id', updateTask);
router.delete('/:id', removeTask);
router.patch('/:id/toggle');