const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoList = document.getElementById('todo-list');
const themeBtn = document.getElementById('theme-toggle');

todoBtn.addEventListener('click', addTodo);
themeBtn.addEventListener('click', toggleTheme);

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let isDark = JSON.parse(localStorage.getItem('isDark')) || false;

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = `todo-item ${todo.done ? 'done' : ''}`;
      todoItem.dataset.id = todo.id;
      todoItem.innerHTML = `
        <input type="checkbox" class="checkbox" ${todo.done ? 'checked' : ''}>
        <span>${todo.content}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;

      const checkbox = todoItem.querySelector('.checkbox');
      checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
      });

      const deleteBtn = todoItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

      todoList.appendChild(todoItem);
    });
    saveTodos();
}

function addTodo(event) {

  event.preventDefault();
  
  const newTodo = todoInput.value.trim();
  if (newTodo) {
    const todo = {
      id: Date.now(),
      content: newTodo,
      done: false
    };

    todos.push(todo);
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
    if (todoItem) {
      todoItem.classList.toggle('done', todo.done);
    }
  }
  saveTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('dark-theme', isDark);
  themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('isDark', isDark);
}

function initTheme() {
  document.body.classList.toggle('dark-theme', isDark);
  themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

renderTodos();
initTheme();