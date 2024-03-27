import React, { useState } from 'react';

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
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default ToDoForm;
