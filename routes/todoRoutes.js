import {getAllTodo, 
    createTodo, 
    getTodoById,
    deleteTodoById, 
    updateTodoById, 
    todoAsComplete,
    todoAsIncomplete ,
    getTodoByStatus} from '../controllers/todoControllers.js';
import express from 'express';

const router = express.Router();


router.get("/todo", getAllTodo);
router.post("/todo/create",createTodo);
router.get("/todo/:id", getTodoById);
router.delete("/todo/delete/:id", deleteTodoById);
router.put("/todo/update/:id", updateTodoById);
router.patch("/todo/:id/complete", todoAsComplete);
router.patch("/todo/:id/incomplete", todoAsIncomplete);
router.get("/todo/status/:status", getTodoByStatus)

export default router;