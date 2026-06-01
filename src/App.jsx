import { useState, useEffect } from "react";

function App() {
  // načítanie z localStorage pri štarte
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "done") return task.done;
  return true;
});

  // uloženie do localStorage pri každej zmene tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (input === "") return;

    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text: input, done: false }
    ]);

    setInput("");
  }

  function deleteTask(id) {
     const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function toggleTask(id) {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    setTasks(updated);
  }

  function startEdit(id) {
    const task = tasks.find(t => t.id === id);
    setEditIndex(id);
    setEditText(task.text);
  }

  function saveEdit() {
    const updated = tasks.map((task) => {
      if (task.id === editIndex) {
        return { ...task, text: editText };
      }
      return task;
    });

    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>React Todo App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("done")}
          style={{ fontWeight: filter === "done" ? "bold" : "normal" }}
        >
          Done
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                flex: 1,
                cursor: "pointer",
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>

            <button onClick={() => startEdit(task.id)}>
              ✏️
            </button>

            <button onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
      {editIndex !== null && (
        <div style={{ marginTop: 20 }}>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button onClick={saveEdit}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;