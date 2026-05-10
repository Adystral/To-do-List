const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

// Event listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
  }
}

function toggleComplete(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

// edit a task
function editTask(id) {
  const taskToEdit = tasks.find((task) => task.id === id);

  const newText = prompt("Edit your task:", taskToEdit.text);

  if (newText !== null && newText.trim() !== "") {
    taskToEdit.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  // Check if the array is empty
  if (tasks.length === 0) {
    taskList.innerHTML = `
      <div style="text-align: center; margin-top: 40px; color: #888; animation: fadeIn 0.5s;">
        <i class="fa-solid fa-clipboard-check" 
          style="
            font-size: 50px;
            color: #4facfe;
            opacity: 0.6;
            margin-bottom: 15px;
          ">
        </i>
        <p style="font-size: 18px;">
          You're all caught up!
        </p>
        <p style="font-size: 14px; margin-top: 5px;">
          Enjoy your day or add a new task above.
        </p>
      </div>
    `;
    return;
  }

  // if not empty, then loop through array and create html for each
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="action-btns">
        <button class="check-btn" onclick="toggleComplete(${task.id})">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="edit-btn" onclick="editTask(${task.id})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}
