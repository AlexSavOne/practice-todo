// src\js\modules\todoItem.js

export const createTodoItem = (task, price, completed) => {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const taskText = document.createElement('span');
  taskText.textContent = task;

  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.className = 'price';
  priceInput.value = isNaN(price) ? '' : price.toFixed(2);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';

  listItem.append(checkbox, taskText, priceInput, deleteButton);
  return listItem;
};
