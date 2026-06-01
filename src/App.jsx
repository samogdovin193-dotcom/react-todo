import { useState, useEffect } from "react";

function App() {
  // načítanie z localStorage pri štarte
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  // uloženie do localStorage pri každej zmene tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (input === "") return;

    setTasks([...tasks, input]);
    setInput("");
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>React Todo</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            onClick={() => deleteTask(index)}
            style={{ cursor: "pointer", marginTop: 5 }}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;