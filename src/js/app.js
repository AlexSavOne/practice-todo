import { createTodoItem } from './modules/todoItem.js';

const input = document.querySelector('.todo-input');
const addButton = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

const addTask = () => {
  const task = input.value.trim();
  if (task) {
    const todoItem = createTodoItem(task);
    todoList.append(todoItem);
    input.value = '';
  }
};

addButton.addEventListener('click', addTask);

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
