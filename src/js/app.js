// src\js\app.js

import { addEventListeners } from './modules/events.js';

const todoContainers = document.querySelectorAll('.todo-container');

todoContainers.forEach((container) => {
  addEventListeners(container);
});
