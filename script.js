const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo");
const selection = document.querySelector(".filter-todos");
// ============================================
document.addEventListener("DOMContentLoaded", getLocalToDos);
// ============================================
function createTasks(e) {
  // get todoInput value
  let value = todoInput.value;
  // create new todo task
  if (value !== "") {
    const li = document.createElement("li");
    li.innerHTML = `<span>${value}</span>`;

    li.innerHTML += `<div>
    <i class="fa-solid fa-check check"></i>
    <i class="fa-solid fa-trash-can trash"></i>
  </div>`;
    todoList.appendChild(li);
  }
  // add to localStorage
  saveLocalToDos(value);
  // reset input
  todoInput.value = "";
  todoInput.focus();
}

function changeTasks(e) {
  const target = e.target;
  const targetClassList = target.classList;
  let li = target.parentElement.parentElement;
  
  if (targetClassList.contains("trash")) {
    li.remove();
    removeLocalToDos(li);
  } else if (targetClassList.contains("check")) {
    li.classList.toggle("done");
  }
}

function filterTasks(e) {
  let value = e.target.value;
  const filterArray = [...todoList.childNodes];

  filterArray.forEach(function (todo) {
    switch (value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// localStorage===============================================

// saveLocalToDos
function saveLocalToDos(todo) {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// getLocalToDos
function getLocalToDos(todo) {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  savedTodos.forEach(function (todo) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${todo}</span>`;
    li.innerHTML += `<div>
    <i class="fa-solid fa-check check"></i>
    <i class="fa-solid fa-trash-can trash"></i>
  </div>`;
    todoList.appendChild(li);
  });
}

// removeLocalToDos
removeLocalToDos;
function removeLocalToDos(todo) {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const text = todo.children[0].textContent;
  const filteredItems = savedTodos.filter((t) => {
    return t !== text;
  });
  localStorage.setItem("todos", JSON.stringify(filteredItems));
}

// events=========================================
selection.addEventListener("change", filterTasks);
todoList.addEventListener("click", changeTasks);
todoBtn.addEventListener("click", createTasks);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    createTasks();
  }
});
