import React, { useState } from 'react';
import './todoForm.scss';

interface ToDoFormProps {
  onAddTodo: (task: string) => void;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Task"
        className="task-input"
      />
      <button onClick={handleAddTodo} className="add-button">Add</button>
    </div>
  );
};

export default ToDoForm;