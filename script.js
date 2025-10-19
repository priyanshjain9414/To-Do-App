document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const themeToggle = document.getElementById('theme-toggle');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  
    function updateThemeIcon(theme) {
      themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      theme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  
    // Render todos
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${todo}</span>
          <button class="delete-btn" onclick="deleteTodo(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        todoList.appendChild(li);
      });
    }
  
    // Add new todo
    todoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText) {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
      }
    });
  
    // Delete todo
    window.deleteTodo = function(index) {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
  
    renderTodos();
  });
  
