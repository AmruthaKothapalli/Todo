import React, { useState, useEffect } from "react";

const TodoApp = () => {
  // State variables
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [id, setId] = useState();
  const [editing, setEditing] = useState(false);

  const onToggleEdit = (index) => {
    console.log(todos[index].title);
    setValue(todos[index].title);
    setId(index);
    setEditing(true);
  };

  const onSubmitEditTodo = (e) => {
    e.preventDefault();
    const c = [...todos];
    c[id].title = value;
    setTodos(c);
    setEditing(false);
    setValue("");
  };

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    getTodos();
  }, []);

  // Fetch todos from the API endpoint
  const getTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // Add a new task to the list
  const addTask = (e) => {
    e.preventDefault();
    const obj = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    if (value !== "") {
      setTodos([obj, ...todos]);
      setValue("");
    }
  };

  // Toggle the completion status of a task
  const onChangeBox = (id) => {
    const updatedTodos = todos.map((el) =>
      el.id === id ? { ...el, completed: !el.completed } : el
    );
    setTodos(updatedTodos);
  };

  // Delete a task from the list
  const deleteTask = (itemId) => {
    const updatedTodos = [...todos].filter((id) => id.id !== itemId);
    setTodos(updatedTodos);
  };

  // Filter the tasks based on the selected filter
  const filteredTodos = todos.filter((todo) =>
    filter === "completed" ? todo.completed : true
  );
  console.log(todos);
  return (
    <>
      <h1 className="header1">TODO</h1>
      <main className="app">
        <section className="createTodo" id="section">
          {editing === false ? (
            <>
              <input
                type="text"
                placeholder="Add a new task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="inputText"
              />
              <button onClick={addTask} className="button">
                Add Task
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="edit your task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="inputText"
              />
              <button onClick={onSubmitEditTodo} className="updatebtn">
                Update Item
              </button>
            </>
          )}
        </section>
        <div className="filter-buttons">
          <button
            id="all"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            id="comp"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <section className="todo-list" id="section">
          <h3>Todo-List</h3>
          <div className="list" id="todolist">
            <ul className="todo_wrapper" type="none">
              {filteredTodos.map((todo, index) => (
                <>
                  <div className="todoItem">
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onChangeBox(todo.id)}
                        key={todo.id}
                      />
                    </label>
                    <div
                      id="todoContent"
                      style={{
                        textDecoration: todo.completed ? "line-through" : null,

                        color: todo.completed ? "mediumpurple" : null,
                      }}
                    >
                      {todo.title}
                    </div>
                    <div className="actions">
                      <button
                        onClick={() => onToggleEdit(index)}
                        className="edit"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => deleteTask(todo.id)}
                        className="del"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <br />
                </>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
export default TodoApp;
