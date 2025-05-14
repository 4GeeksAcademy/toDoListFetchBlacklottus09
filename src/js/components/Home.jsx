import React, { useState } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = (event) => {
    if (event.key === "Enter" && task.trim() !== "") {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const deleteTask = (indexToDelete) => {
    setTaskList(taskList.filter((_ , index) => index !== indexToDelete));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center display-1 fw-light text-muted mb-4">todos</h1>

      <div className="card shadow mx-auto">
        <div className="card-body p-0">
          <input
            type="text"
            className="form-control border-0 fs-4 py-3"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={addTask}
          />
          <ul className="list-group list-group-flush">
            {taskList.map((taskToDo, index) => (
             <li
  key={index}
  className="list-group-item d-flex justify-content-between align-items-center task-item fs-4"
>
  <span className="flex-grow-1">{taskToDo}</span>
  <button
    className="btn btn-sm btn-outline-danger delete-btn ms-3"
    onClick={() => deleteTask(index)}
  >
✖</button>
</li>

            ))}
          </ul>
          <div className="text-muted px-3 py-2 small">
            {taskList.length} item{taskList.length !== 1 ? "s" : ""} left
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
