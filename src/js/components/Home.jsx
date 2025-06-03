import React, { useState, useEffect } from "react";

const urlBase = 'https://playground.4geeks.com/todo';

const initialStateTask = {
  label: "",
  is_done: false
};
const initialError = {
  message: "",
  type: ""
}

const Home = () => {
  const [task, setTask] = useState(initialStateTask);
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(initialError)

  const createUser = async () => {
    try {
      const response = await fetch(`${urlBase}/users/test123`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        getAllTask()
      }
    } catch {
      console.log(error)
    }
  }

  const getAllTask = async () => {
    try {
      const response = await fetch(`${urlBase}/users/test123`);
      const data = await response.json();
      if (response.status == 404) {
        createUser()
      }
      else if (response.ok) {
        setTaskList(data.todos);
      } else {
        console.log('ah ah ah no dijiste la palabra mágica');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (event) => {
    if (event.key === "Enter" && task.label.trim() !== "") {
      try {
        const response = await fetch(`${urlBase}/todos/test123`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)
        });
        if (response.ok) {
          getAllTask();
          setTask(initialStateTask);
        }
      } catch (error) {
        console.log('Error al agregar tarea:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${urlBase}/todos/${id}`, { method: "DELETE" })
      if (response.ok) {
        getAllTask()
      }
    } catch {
      console.log(error)
    }
  };
  const deleteUser = async () => {
    try {
      const response = await fetch(`${urlBase}/users/test123`, {
        method: "DELETE"
      })
      if (response.ok) {
        getAllTask()
      }
    } catch {
      console.log(error)
    }
  }

  useEffect(() => {
    createUser()
    getAllTask();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center display-1 fw-light text-muted mb-4">todos</h1>

      <div className="card shadow mx-auto">
        <div className="card-body p-0">
          <input
            type="text"
            className="form-control border-0 fs-4 py-3"
            placeholder="What needs to be done?"
            value={task.label}
            onChange={(e) => setTask({ ...task, label: e.target.value })}
            onKeyDown={addTask}
          />
          <ul className="list-group list-group-flush">
            {taskList.length === 0 ? (
              <li className="list-group-item text-center text-muted">No tasks, add a task</li>
            ) : (
              taskList.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center task-item fs-4"
                >
                  <span className="flex-grow-1">{item.label}</span>
                  <button
                    className="btn btn-sm btn-outline-danger delete-btn ms-3"
                    onClick={() => deleteTask(item.id)}
                  >
                    ✖
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="text-muted px-3 py-2 small">
            {taskList.length} item{taskList.length !== 1 ? "s" : ""} left
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger"
              onClick={deleteUser}>Delete all task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
