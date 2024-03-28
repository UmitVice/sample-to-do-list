import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from 'components/TodoForm';
import TodoItem from 'components/TodoItem';
import './todoList.scss';

interface Todo {
  id: number;
  task: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios?.get<Todo[]>('http://localhost:4000/api/tasks');
      setTodos(response?.data);
    } catch (error) {
      console.error('Error fetching todos: ', error);
    }
  };

  const handleAddTodo = async (task: string) => {
    try {
      const response = await axios?.post<Todo>('http://localhost:4000/api/tasks', { task });
      setTodos([...todos, response?.data]);
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios?.delete(`http://localhost:4000/api/tasks/${id}`);
      setTodos(todos?.filter(todo => todo?.id !== id));
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">ToDo List</h1>
      <div className="todo-form-container">
        <TodoForm onAddTodo={handleAddTodo} />
      </div>
      <ul className="todo-list">
        {todos?.map(todo => (
          <TodoItem key={todo?.id} todo={todo} onDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
