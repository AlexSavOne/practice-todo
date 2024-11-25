import { createTodoItem } from './todoItem.js';
import { saveTasks, loadTasks, saveTitle, loadTitle } from './storage.js';
import { updatePrices } from './prices.js';

export const addEventListeners = (container) => {
  const id = container.getAttribute('data-id');
  const input = container.querySelector('.todo-input');
  const priceInput = container.querySelector('.price-input');
  const addButton = container.querySelector('.add-btn');
  const todoList = container.querySelector('.todo-list');
  const totalPriceEl = container.querySelector('.total-price');
  const spentPriceEl = container.querySelector('.spent-price');
  const title = container.querySelector('h1');

  const addTask = () => {
    const task = input.value.trim();
    const price = parseFloat(priceInput.value.trim());
    if (task && !isNaN(price)) {
      const todoItem = createTodoItem(task, price, false);
      todoList.append(todoItem);
      const tasks = Array.from(todoList.children).map((item) => ({
        text: item.querySelector('span').textContent,
        price: parseFloat(item.querySelector('.price').textContent) || 0,
        completed: item.querySelector('input[type="checkbox"]').checked,
      }));
      saveTasks(id, tasks);
      input.value = '';
      priceInput.value = '';
      updatePrices(todoList, totalPriceEl, spentPriceEl);
    }
  };

  const handleDelete = (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('.todo-item').remove();
      const tasks = Array.from(todoList.children).map((item) => ({
        text: item.querySelector('span').textContent,
        price: parseFloat(item.querySelector('.price').textContent) || 0,
        completed: item.querySelector('input[type="checkbox"]').checked,
      }));
      saveTasks(id, tasks);
      updatePrices(todoList, totalPriceEl, spentPriceEl);
    }
  };

  const handleCheckboxChange = (e) => {
    if (e.target.type === 'checkbox') {
      const tasks = Array.from(todoList.children).map((item) => ({
        text: item.querySelector('span').textContent,
        price: parseFloat(item.querySelector('.price').textContent) || 0,
        completed: item.querySelector('input[type="checkbox"]').checked,
      }));
      saveTasks(id, tasks);
      updatePrices(todoList, totalPriceEl, spentPriceEl);
    }
  };

  addButton.addEventListener('click', addTask);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  todoList.addEventListener('click', handleDelete);
  todoList.addEventListener('change', handleCheckboxChange);

  title.addEventListener('input', () => {
    saveTitle(id, title.textContent);
  });

  const savedTitle = loadTitle(id);
  if (savedTitle) {
    title.textContent = savedTitle;
  }

  const tasks = loadTasks(id);
  tasks.forEach((task) => {
    const todoItem = createTodoItem(task.text, task.price, task.completed);
    todoList.append(todoItem);
  });

  updatePrices(todoList, totalPriceEl, spentPriceEl);
};
