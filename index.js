const momentumTime = document.querySelector(".momentum--time"),
  momentumName = document.querySelector(".momentum--name"),
  nameInput = momentumName.querySelector(".momentum--name--input"),
  nameDisplay = momentumName.querySelector(".momentum--name--display"),
  momentumTodos = document.querySelector(".momentum--todos");
momentumTodoSubmit = momentumTodos.querySelector(".momentum--todos--submit");

function numberFormat(value) {
  if (value < 10) return `0${value}`;
  else return value;
}

function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function addTodos(value) {
  const todos = getTodos();
  const id = Date.now().toString();
  todos.push({
    id,
    value,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  return id;
}

function deleteTodos(id) {
  const todos = getTodos();

  const newTodos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  localStorage.setItem("todos", JSON.stringify(newTodos));
}

function getTimeString() {
  const toDay = new Date();
  const month = toDay.getMonth();
  const date = toDay.getDate();
  const hour = toDay.getHours();
  const minute = toDay.getMinutes();

  const dateElement = momentumTime.querySelectorAll("span")[0];
  const timeElement = momentumTime.querySelectorAll("span")[1];

  dateElement.innerText = `${numberFormat(month + 1)}/${numberFormat(date)}`;
  timeElement.innerText = `${numberFormat(hour)}:${numberFormat(minute)}`;
}

function submitEventHandler(event) {
  event.preventDefault();
  const { target } = event;
  const input = target.querySelector("input");
  const value = input.value;
  if (!value) return;

  if (target.classList.contains("momentum--name")) {
    localStorage.setItem("name", value);
    nameEvents();
  } else if (target.classList.contains("momentum--todos--submit")) {
    input.value = "";
    const id = addTodos(value);
    displayTodo(id, value);
  }
}

function nameEvents() {
  const name = localStorage.getItem("name");
  if (name) {
    nameDisplay.style.display = "";
    nameInput.style.display = "none";
    nameDisplay.querySelector("span").innerText = `Hello, ${name}`;
  } else {
    nameInput.style.display = "";
    nameDisplay.style.display = "none";
  }
}

function todoDeleteEventHandler(event) {
  const { target } = event;
  const value = target.value;
  const li = target.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
  deleteTodos(value);
}

function displayTodo(id, value) {
  const delBtn = document.createElement("button");
  delBtn.value = id;
  delBtn.innerText = "💣";
  delBtn.addEventListener("click", todoDeleteEventHandler);

  const valueSpan = document.createElement("span");
  valueSpan.innerText = value;

  const li = document.createElement("li");
  li.id = id;
  li.appendChild(delBtn);
  li.appendChild(valueSpan);

  const ul = momentumTodos.querySelector("ul");
  ul.appendChild(li);
}

function toDosEvents() {
  const todos = getTodos();
  todos.forEach(function (todo) {
    const { id, value } = todo;
    displayTodo(id, value);
  });
}

function init() {
  momentumName.addEventListener("submit", submitEventHandler);
  momentumTodoSubmit.addEventListener("submit", submitEventHandler);
  setInterval(getTimeString(), 60000);
  nameEvents();
  toDosEvents();
}
init();
