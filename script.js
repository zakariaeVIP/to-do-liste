// script.js

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText) {
    const task = {
      text: taskText,
      priority: priority,
      completed: false,
    };
    addTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
  }
});

// Add task to DOM
function addTaskToList(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task.text} (${task.priority})</span>
    <div>
      <button class="complete">✔</button>
      <button class="delete">✖</button>
    </div>
  `;
  li.classList.toggle('completed', task.completed);

  // Mark task as completed
  li.querySelector('.complete').addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed', task.completed);
    updateTaskInLocalStorage(task.text, task);
  });

  // Delete task
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    removeTaskFromLocalStorage(task.text);
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToList);
}

// Update task in localStorage
function updateTaskInLocalStorage(taskText, updatedTask) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map((task) =>
    task.text === taskText ? updatedTask : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
