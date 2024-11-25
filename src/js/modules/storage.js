export const loadTasks = (id) => {
  const tasks = JSON.parse(localStorage.getItem(`todo_${id}`)) || [];
  return tasks;
};

export const saveTasks = (id, tasks) => {
  localStorage.setItem(`todo_${id}`, JSON.stringify(tasks));
};

export const saveTitle = (id, title) => {
  localStorage.setItem(`title_${id}`, title);
};

export const loadTitle = (id) => {
  return localStorage.getItem(`title_${id}`);
};
