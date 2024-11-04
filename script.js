//کادری که کاربر اسم تسک را وارد میکنه
const todoInput = document.querySelector(".todo-input");
//   دکمه + برای اضافه کردن

const todoButton = document.querySelector(".todo-button");
// پاک کردن و خط زدن کارها

const todoList = document.querySelector(".todo-container");

const filterOption = document.querySelector(".filter-todos");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

function addTodo(ed) {
  // از رفرش کردن صفحه جلوگیری کند
  ed.preventDefault();
  console.log(ed);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
          <span><i class="fa-regular fa-square-check"></i></span>
          <span><i class="fa-solid fa-trash-can"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  console.log(item.parentElement.parentElement);

  if (classList[1] === "fa-square-check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-can") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}

function filterTodos(p) {
  //console.log(e.target.value);
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes].filter(
    (todo) => todo.nodeType === 1 && todo.classList.contains("todo")
  );
  todos.forEach((todo) => {
    switch (p.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //localStorage.getItem('todos')
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  //localStorage.getItem('todos')
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `<li>${todo}</li>
          <span><i class="fa-regular fa-square-check"></i></span>
          <span><i class="fa-solid fa-trash-can"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todo", JSON.stringify(filteredTodos));
}
