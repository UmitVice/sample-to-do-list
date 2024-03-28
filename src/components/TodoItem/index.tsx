import React, { useState } from 'react';
import './todoItem.scss';
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
  const [completed, setCompleted] = useState<boolean>(todo?.completed || false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="task-container">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <p>{todo?.task}</p>
      </div>
      <button className="trash-button" onClick={handleDeleteTodo}>
        <img src={trashIcon} alt="Delete" className="trash-icon" />
      </button>
    </li>
  );
};

export default TodoItem;
