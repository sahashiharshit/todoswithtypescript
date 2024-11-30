import express,{  Request, Response } from "express";

import { Todo } from "../models/todo";

let todos: Todo[] = [];
interface RequestParams {
    todoId: string;
}

interface RequestBody {
    text: string;
}
const router = express.Router();



router.get('/', (req:Request, res:Response) => {
    res.status(200).json({  todos });
});

router.post('/todo', (req:Request, res:Response) => {
    const text:string= req.body.text as string;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Posted new todo', todo: newTodo });
});

router.put('/todos/:todoId', (req:any,res:any) => {
    const tid = req.params.todoId;
    const newText = req.body.text;
    const todoIndex = todos.findIndex((todo) => todo.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: newText };
        return res.status(201).json({ message: 'Todo Updated',  todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});
router.delete('/todo/:todoId', (req:Request<{todoId:string}>, res:Response) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: 'Deleted Todo',  todos })
});

export default router;




