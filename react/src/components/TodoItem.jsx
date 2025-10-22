import React from 'react';
import './TodoItem.css';

/**
 * TodoItem component - individual todo item
 * Demonstrates Copilot generating reusable React components
 */
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-title">{todo.title}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        title="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
