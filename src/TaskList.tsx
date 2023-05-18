import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from './Task';
import './TaskList.css';

type TaskType = {
  id: number;
  task: string;
  done: number;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data.sort((a: TaskType, b: TaskType) => a.done - b.done));
  };

  const addTask = async () => {
    const res = await axios.post("http://localhost:5000/tasks", { task: taskInput });
    setTasks([...tasks, { id: res.data.id, task: taskInput, done: res.data.done }]);
    setTaskInput("");
  };

  const removeTask = async (id: number) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDone = async (task: TaskType) => {
    const updatedTask = { ...task, done: task.done ? 0 : 1 };
    await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
    setTasks(
      tasks
        .map((t) => (t.id === task.id ? updatedTask : t))
        .sort((a: TaskType, b: TaskType) => a.done - b.done)
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="task-list">
      <div className="task-input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} removeTask={removeTask} toggleDone={toggleDone} />
      ))}
    </div>
  );
};

export default TaskList;
