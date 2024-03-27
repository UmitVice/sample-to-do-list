import React from 'react';
import 'todoItem.scss';
import trashIcon from 'assets/trash-icon.svg';

interface TodoItemProps {
  todo: {
    id: number;
    task: string;
    completed?: boolean;
  };
  onDeleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDeleteTodo }) => {
  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {todo.task}
      <button className="trash-button" onClick={handleDeleteTodo}>
        <img src={trashIcon} alt="Delete" className="trash-icon" />
      </button>
    </li>
  );
};

export default TodoItem;
