"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let todos = [];
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({ todos });
});
router.post('/todo', (req, res) => {
    const text = req.body.text;
    const newTodo = {
        id: new Date().toISOString(),
        text: text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Posted new todo', todo: newTodo });
});
router.put('/todos/:todoId', (req, res) => {
    const tid = req.params.todoId;
    const newText = req.body.text;
    const todoIndex = todos.findIndex((todo) => todo.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: newText };
        return res.status(201).json({ message: 'Todo Updated', todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});
router.delete('/todo/:todoId', (req, res) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: 'Deleted Todo', todos });
});
exports.default = router;
