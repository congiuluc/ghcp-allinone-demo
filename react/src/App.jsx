import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

/**
 * App component - main React component
 * Demonstrates Copilot generating React functional components
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo App</h1>
        <p>GitHub Copilot Code Suggestions Demo</p>
      </header>
      <main className="app-main">
        <TodoList />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 GitHub Copilot Demo - React</p>
      </footer>
    </div>
  );
}

export default App;
