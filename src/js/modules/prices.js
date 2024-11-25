// src\js\modules\prices.js

export const updatePrices = (todoList, totalPriceEl, spentPriceEl) => {
  let total = 0;
  let spent = 0;

  todoList.querySelectorAll('.todo-item').forEach((item) => {
    const price = parseFloat(item.querySelector('.price').value) || 0;
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
