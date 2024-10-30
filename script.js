const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);

function addTodo(e) {
  e.preventDefault();
  console.log(e);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
          <span><i class="fa-regular fa-square-check"></i></span>
          <span><i class="fa-solid fa-trash-can"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  console.log(item.parentElment.parentElment);
  if (classList[1] === "fa-square-check") {
    const todo = item.parentElment.parentElment;
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-can") {
    const todo = item.parentElment.parentElment;
    todo.remove();
  }
}
