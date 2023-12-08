document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todoForm');
  const todoList = document.getElementById('todoList');
  const loader = document.getElementById('loader');

  showLoader();
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(data => {
      hideLoader();
      renderList(data);
    });

  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const completed = document.getElementById('completed').checked;

    const newItem = { title, completed };
    addItemToList(newItem);

    todoForm.reset();
  });

  function renderList(items) {
    todoList.innerHTML = '';
    items.forEach(item => addItemToList(item));
  }


  function addItemToList(item) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    if (item.completed) {
        listItem.classList.add('completed');
      }
  

    listItem.innerHTML = `
      <h3 style="${item.completed ? 'text-decoration: line-through;' : ''}">
        ${item.title}
      </h3>
      ${item.completed ? '<span class="tick">&#10003;</span>' : ''}
    `;
    todoList.appendChild(listItem);
  }

  function showLoader() {
    loader.style.display = 'block';

  }

  function hideLoader() {
    loader.style.display = 'none';
  }
});
