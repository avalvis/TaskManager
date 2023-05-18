import React from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <div className="app-header">Task Manager</div>
      <TaskList />
      <div className="app-footer">Developed by Antonis Valvis</div>
    </div>
  );
}

export default App;
