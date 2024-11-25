export const createTodoItem = (task, price, completed) => {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const taskText = document.createElement('span');
  taskText.textContent = task;

  const priceText = document.createElement('span');
  priceText.className = 'price';
  priceText.textContent = price.toFixed(2);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';

  listItem.append(checkbox, taskText, priceText, deleteButton);
  return listItem;
};
