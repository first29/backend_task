import { Router } from "express";
import {
  login,
  actualizar_fase,
  deleteTask,
  getTasks,
  saveTask,
  getTask,
  updateTask,
  getTasksCount,
} from "../controllers/tasks.js";

const router = Router();

router.get("/tasks", getTasks);

router.get("/tasks/count", getTasksCount);

router.post("/tasks", saveTask);

router.get("/tasks/:id", getTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

router.post("/tasks/login", login);

router.post("/tasks/actualizar_fase", actualizar_fase);

export default router;
