export const createTodoItem = (task) => {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const taskText = document.createElement('span');
  taskText.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => listItem.remove());

  listItem.append(taskText, deleteButton);
  return listItem;
};
