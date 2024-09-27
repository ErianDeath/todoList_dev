const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoList = document.getElementById('todo-list');

todoBtn.addEventListener('click', addTodo);

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';
      todoItem.dataset.id = todo.id;
      todoItem.innerHTML = `
        <input type="checkbox" class="checkbox" ${todo.done ? 'checked' : ''}>
        <span>${todo.content}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;

      const checkbox = todoItem.querySelector('.checkbox');
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

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
  }
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

renderTodos();