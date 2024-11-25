import { createTodoItem } from './modules/todoItem.js';

const app = document.getElementById('app');
const addTodoButton = document.getElementById('add-todo-container');

let todoContainerCount = 0;

// Функция для добавления нового контейнера
const addTodoContainer = () => {
  todoContainerCount++;

  // Создание нового контейнера
  const container = document.createElement('div');
  container.classList.add('todo-container');
  container.setAttribute('data-id', todoContainerCount);

  // Вставка элементов в новый контейнер
  const title = document.createElement('h1');
  title.contentEditable = true;

  const inputDiv = document.createElement('div');
  const input = document.createElement('input');
  input.classList.add('todo-input');
  input.setAttribute('placeholder', 'Add a new task');
  const priceInput = document.createElement('input');
  priceInput.classList.add('price-input');
  priceInput.setAttribute('placeholder', 'Price');
  const addButton = document.createElement('button');
  addButton.classList.add('add-btn');
  addButton.textContent = 'Add';

  inputDiv.append(input, priceInput, addButton);

  const todoList = document.createElement('ul');
  todoList.classList.add('todo-list');

  const totals = document.createElement('div');
  totals.classList.add('totals');
  const totalPrice = document.createElement('div');
  totalPrice.innerHTML = `Сумма: <span class="total-price">0.00</span>р.`;
  const spentPrice = document.createElement('div');
  spentPrice.innerHTML = `Потрачено: <span class="spent-price">0.00</span>р.`;
  totals.append(totalPrice, spentPrice);

  container.append(title, inputDiv, todoList, totals);

  app.append(container);

  // Слушатели для действий в карточке
  const addTask = () => {
    const task = input.value.trim();
    const price = parseFloat(priceInput.value.trim());
    if (task && !isNaN(price)) {
      const todoItem = createTodoItem(task, price, false);
      todoList.append(todoItem);
      saveTasks(container);
      input.value = '';
      priceInput.value = '';
      updatePrices(container);
    }
  };

  const saveTasks = (container) => {
    const id = container.getAttribute('data-id');
    const todoList = container.querySelector('.todo-list');
    const tasks = Array.from(todoList.children).map((item) => ({
      text: item.querySelector('span').textContent,
      price: parseFloat(item.querySelector('.price').textContent) || 0,
      completed: item.querySelector('input[type="checkbox"]').checked,
    }));
    localStorage.setItem(`todo_${id}`, JSON.stringify(tasks));
  };

  const updatePrices = (container) => {
    const todoList = container.querySelector('.todo-list');
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

    container.querySelector('.total-price').textContent = total.toFixed(2);
    container.querySelector('.spent-price').textContent = spent.toFixed(2);
  };

  const loadTasks = (container) => {
    const id = container.getAttribute('data-id');
    const tasks = JSON.parse(localStorage.getItem(`todo_${id}`)) || [];
    tasks.forEach((task) => {
      const todoItem = createTodoItem(task.text, task.price, task.completed);
      container.querySelector('.todo-list').append(todoItem);
    });
    updatePrices(container);
  };

  const loadTitle = (container) => {
    const id = container.getAttribute('data-id');
    const savedTitle = localStorage.getItem(`title_${id}`);
    if (savedTitle) {
      container.querySelector('h1').textContent = savedTitle;
    }

    container.querySelector('h1').addEventListener('input', () => {
      localStorage.setItem(`title_${id}`, container.querySelector('h1').textContent);
    });
  };

  addButton.addEventListener('click', addTask);

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  container.querySelector('.todo-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('.todo-item').remove();
      saveTasks(container);
      updatePrices(container);
    }
  });

  container.querySelector('.todo-list').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      saveTasks(container);
      updatePrices(container);
    }
  });

  loadTasks(container);
  loadTitle(container);
};

addTodoButton.addEventListener('click', addTodoContainer);
