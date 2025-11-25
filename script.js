document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("task-input");
  const addBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const darkToggle = document.getElementById("dark-toggle");

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));

  const isDark = JSON.parse(localStorage.getItem("darkMode"));
  if (isDark) {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (value !== "") {
      addTask(value);
      input.value = "";
    }
  });

  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
    localStorage.setItem("darkMode", darkToggle.checked);
  });

  function addTask(text, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = text;
    span.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", span.textContent);
      if (newText !== null) {
        span.textContent = newText.trim();
        saveTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
