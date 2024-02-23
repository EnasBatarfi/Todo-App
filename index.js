/* eslint-disable no-unused-vars */

// Variables
let todosList = [];
let emptyImage = document.createElement("img");
const mainContainer = document.getElementById("container");
const todosContainer = document.getElementById("todos-container");
const addButton = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const deleteButton = document.getElementsByClassName("delete-btn")[0];
const inputContainer = document.getElementById("input-container");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const counter = document.getElementById("counter");
const todosFooter = document.getElementById("todos-footer");
const clearButton = document.getElementById("clear-btn");

// Create the todo row
function createTodoRow(todo) {
  // Create the row div
  const todoRow = document.createElement("div");
  todoRow.id = "todo-row";

  // Create the checkbox
  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";
  doneCheckbox.checked = todo.done;
  doneCheckbox.addEventListener("change", () =>
    doneCheck(doneCheckbox, todosList.indexOf(todo))
  );
  todoRow.appendChild(doneCheckbox);

  // Create the text and apply line-through style if the todo is completed
  const todoText = document.createElement("p");
  todoText.textContent = todo.description;
  todoText.style.textDecoration = todo.done ? "line-through" : "none";
  todoRow.appendChild(todoText);

  // Create edit button
  const editButton = createButton("fa-regular fa-pen-to-square");
  editButton.addEventListener("click", () => editTodo(todosList.indexOf(todo)));
  todoRow.appendChild(editButton);

  // Create delete button
  const deleteButton = createButton("fa-regular fa-square-minus");
  deleteButton.addEventListener("click", () =>
    deleteTodo(todosList.indexOf(todo))
  );
  todoRow.appendChild(deleteButton);

  return todoRow;
}

// Utility function to create button
function createButton(iconClass) {
  const button = document.createElement("button");
  button.innerHTML = `<i class="${iconClass}"></i>`;
  button.className = "row-btn";
  return button;
}

// Display todos
function displayTodos(todos) {
  todosContainer.innerHTML = "";

  if (todos.length === 0) {
    // If todos list is empty then display the empty image
    // To ensure the empty image is always appended to the todo container when needed
    emptyImage.src = "./images/empty_image.png";
    emptyImage.alt = "empty image";
    emptyImage.id = "empty-image";
    todosContainer.appendChild(emptyImage);
  } else {
    todos.forEach((todo) => {
      const todoRow = createTodoRow(todo);
      todosContainer.appendChild(todoRow);
    });
  }

  counter.textContent = `You have ${todos.length} tasks.`;
}

// Add todo
function addTodo() {
  const newTodo = todoInput.value;
  if (newTodo.trim() !== "") {
    if (newTodo.length <= 100) {
      const todo = { description: newTodo, done: false };
      todosList.unshift(todo);
      displayTodos(todosList);
      todoInput.value = "";
      localStorage.setItem("todoList", JSON.stringify(todosList));
    } else {
      alert("Todo description exceeds the maximum allowed length!");
    }
  } else {
    alert("Cannot add an empty todo item!");
  }
}

// Delete todo
function deleteTodo(index) {
  todosList.splice(index, 1);
  displayTodos(todosList);
  localStorage.setItem("todoList", JSON.stringify(todosList));
}

// Clear all todos
function clearAll() {
  todosList.splice(0, todosList.length);
  displayTodos(todosList);
  localStorage.setItem("todoList", JSON.stringify(todosList));
}

// Search for todo
function searchTodo() {
  const searchTerm = searchInput.value.trim();
  const searchedList = todosList.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayTodos(searchedList);
  searchInput.value = "";
}

// Edit todo
function editTodo(index) {
  const updatedTodo = prompt("editTodo", todosList[index].description);
  if (updatedTodo.trim() !== "") {
    if (updatedTodo.length <= 100) {
      todosList[index].description = updatedTodo;
      localStorage.setItem("todoList", JSON.stringify(todosList));
      displayTodos(todosList);
    } else {
      alert("Todo description exceeds the maximum allowed length!");
    }
  } else {
    alert("Cannot add an empty todo item!");
  }
}

// Handler for checkbox change event
function doneCheck(doneCheckbox, index) {
  todosList[index].done = doneCheckbox.checked;
  localStorage.setItem("todoList", JSON.stringify(todosList));
  // Call displayTodos to apply the style of line-through
  displayTodos(todosList);
}

// ------------------------------------Main------------------------------------
addEventListener("DOMContentLoaded", () => {
  try {
    // Prevent form submission for search container
    searchContainer.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    searchButton.addEventListener("click", searchTodo);

    // Prevent form submission for input container
    inputContainer.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    addButton.addEventListener("click", addTodo);
    clearButton.addEventListener("click", clearAll);

    // Retrieve todos from local storage
    todosList = JSON.parse(localStorage.getItem("todoList"));
  } catch (error) {
    alert("Unknown error happened: " + error.message);
  } finally {
    displayTodos(todosList);
  }
});
