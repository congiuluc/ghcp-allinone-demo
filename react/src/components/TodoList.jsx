import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * TodoList component - manages todo items
 * Demonstrates Copilot generating React hooks and state management
 */
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // TODO: DEMO Step 2 - Add filter state
  // Instructions for Copilot: "Add a state for filter selection with initial value 'all'"
  const [filter, setFilter] = useState('all');

  // Initialize with sample todos
  useEffect(() => {
    setTodos([
      { id: 1, title: 'Learn React', completed: true },
      { id: 2, title: 'Learn GitHub Copilot', completed: false },
      { id: 3, title: 'Build a demo project', completed: false },
    ]);
  }, []);

  /**
   * Add a new todo
   */
  const addTodo = () => {
    if (input.trim() === '') {
      alert('Please enter a todo');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  /**
   * Delete a todo
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * Toggle todo completion status
   */
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // DEMO 1: Type the implementation
  // Hint: Start with: return todos.filter(
  // Watch Copilot suggest the completed check
  const getCompletedTodos = () => {
    // TODO: DEMO - Type the implementation
  };

  // DEMO 2: Type the implementation
  // Hint: Start with: return todos.filter(
  // Watch Copilot suggest the not completed check
  const getPendingTodos = () => {
    // TODO: DEMO - Type the implementation
  };

  // DEMO 3: Type the implementation
  // Hint: Start with: return getCompletedTodos().length;
  // Watch Copilot suggest calling the helper
  const getCompletedCount = () => {
    // TODO: DEMO - Type the implementation
  };

  // DEMO 4: Type the implementation
  // Hint: Start with: return getPendingTodos().length;
  // Watch Copilot suggest calling the helper
  const getPendingCount = () => {
    // TODO: DEMO - Type the implementation
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // TODO: DEMO Step 2 - Generate method to get filtered todos
  /**
   * DEMO: Get filtered todos based on current filter
   * 
   * Instructions for Copilot:
   * "Generate a function getFilteredTodos that:
   * - Returns all todos if filter is 'all'
   * - Returns getCompletedTodos() if filter is 'completed'
   * - Returns getPendingTodos() if filter is 'pending'
   * - Defaults to all todos if filter is unknown"
   */
  const getFilteredTodos = () => {
    throw new Error('TODO: Implement with Copilot suggestion');
  };

  return (
    <div className="todo-list-container">
      <div className="todo-input-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
      </div>

      <div className="todo-stats">
        <div className="stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{todos.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">{getCompletedCount()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pending:</span>
          <span className="stat-value">{getPendingCount()}</span>
        </div>
      </div>

      <div className="todo-items">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))
        )}
      </div>

      {/* 
        TODO: DEMO Step 3 - Generate filter buttons
        
        Instructions for Copilot:
        "Generate a filter button section that:
        - Has three buttons: 'All', 'Active', 'Completed'
        - Buttons should have onClick handlers that call setFilter
        - Apply 'active' class when button matches current filter
        - Display the filtered todo count on each button
        - Add above the todo-items div"
      */}
    </div>
  );
}

export default TodoList;
