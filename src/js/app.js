import { createTodoItem } from './modules/todoItem.js';

const todoContainers = document.querySelectorAll('.todo-container');

todoContainers.forEach((container) => {
  const id = container.getAttribute('data-id');
  const input = container.querySelector('.todo-input');
  const priceInput = container.querySelector('.price-input');
  const addButton = container.querySelector('.add-btn');
  const todoList = container.querySelector('.todo-list');
  const totalPriceEl = container.querySelector('.total-price');
  const spentPriceEl = container.querySelector('.spent-price');
  const title = container.querySelector('h1');

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(`todo_${id}`)) || [];
    tasks.forEach((task) => {
      const todoItem = createTodoItem(task.text, task.price, task.completed);
      todoList.append(todoItem);
    });
    updatePrices();
  };

  const saveTasks = () => {
    const tasks = Array.from(todoList.children).map((item) => ({
      text: item.querySelector('span').textContent,
      price: parseFloat(item.querySelector('.price').textContent) || 0,
      completed: item.querySelector('input[type="checkbox"]').checked,
    }));
    localStorage.setItem(`todo_${id}`, JSON.stringify(tasks));
  };

  const addTask = () => {
    const task = input.value.trim();
    const price = parseFloat(priceInput.value.trim());
    if (task && !isNaN(price)) {
      const todoItem = createTodoItem(task, price, false);
      todoList.append(todoItem);
      saveTasks();
      input.value = '';
      priceInput.value = '';
      updatePrices();
    }
  };

  const updatePrices = () => {
    let total = 0;
    let spent = 0;

    todoList.querySelectorAll('.todo-item').forEach((item) => {
      const price = parseFloat(item.querySelector('.price').textContent) || 0;
      const completed = item.querySelector('input[type="checkbox"]').checked;
      if (completed) {
        spent += price;
      } else {
        total += price;
      }
    });

    totalPriceEl.textContent = total.toFixed(2);
    spentPriceEl.textContent = spent.toFixed(2);
  };

  addButton.addEventListener('click', addTask);

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('.todo-item').remove();
      saveTasks();
      updatePrices();
    }
  });

  todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      saveTasks();
      updatePrices();
    }
  });

  title.addEventListener('input', () => {
    localStorage.setItem(`title_${id}`, title.textContent);
  });

  const savedTitle = localStorage.getItem(`title_${id}`);
  if (savedTitle) {
    title.textContent = savedTitle;
  }

  loadTasks();
});
