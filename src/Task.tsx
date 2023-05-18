import React from 'react';
import './TaskList.css';

type TaskProps = {
  task: TaskType;
  removeTask: (id: number) => void;
  toggleDone: (task: TaskType) => void;
};

type TaskType = {
  id: number;
  task: string;
  done: number;
};

export const Task: React.FC<TaskProps> = ({ task, removeTask, toggleDone }) => (
  <div className="task-item">
    <div className="task-text" style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.task}</div>
    <div>
        <button className="done-button" onClick={() => toggleDone(task)}>Done</button>
        <button className="delete-button" onClick={() => removeTask(task.id)}>Delete</button>
    </div>
  </div>
);
