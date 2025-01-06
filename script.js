document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText) {
    const task = { text: taskText, priority, completed: false };
    addTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
  }
});

function addTaskToList(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.innerHTML = `
    <span>${task.text} (${task.priority})</span>
    <div>
      <button class="complete btn-small waves-effect waves-light">✔</button>
      <button class="delete btn-small waves-effect waves-light red">✖</button>
    </div>
  `;
  li.classList.toggle('completed', task.completed);

  li.querySelector('.complete').addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed', task.completed);
    updateTaskInLocalStorage(task.text, task);
  });

  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    removeTaskFromLocalStorage(task.text);
  });

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToList);
}

function updateTaskInLocalStorage(taskText, updatedTask) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map((task) => (task.text === taskText ? updatedTask : task));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
