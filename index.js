/* eslint-disable no-unused-vars */
let todosList = [
  { description: "I want to improve my skills", done: false },
  { description: "I want to do my laundry and skin care", done: false },
  { description: "I have to go to do my nails", done: true },
  { description: "I have to go to do my nails", done: false },
  { description: "I have to go to do my nails", done: false },
  { description: "I have to go to do my nails", done: false },
];

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

function displayTodos(todosList) {
  todosContainer.innerHTML = "";
  if (todosList.length > 0) {
    try {
      todosList.forEach((todo, i) => {
        const todoRow = document.createElement("div");
        todoRow.id = "todo-row";

        const doneCheckbox = document.createElement("input");
        doneCheckbox.type = "checkbox";
        doneCheckbox.checked = todosList[i].done;
        doneCheckbox.addEventListener("change", () => {
          todo.done = doneCheckbox.checked;
          localStorage.setItem("todoList", JSON.stringify(todosList));
          // call display todo to apply the style of line through
          displayTodos(todosList);
        });
        todoRow.appendChild(doneCheckbox);

        const todoText = document.createElement("p");
        todoText.textContent = todo.description;
        if (todo.done) {
          // Apply style if todo is done
          todoText.style.textDecoration = "line-through";
        }
        todoRow.appendChild(todoText);

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editButton.id = "delete-btn";
        editButton.className = "row-btn";
        editButton.addEventListener("click", () => editTodo(i));
        todoRow.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteButton.id = "edit-btn";
        deleteButton.className = "row-btn";
        deleteButton.addEventListener("click", () => deleteTodo(i));
        todoRow.appendChild(deleteButton);

        todosContainer.appendChild(todoRow);
        mainContainer.appendChild(todosContainer);
      });
      counter.textContent = `You have ${todosList.length} tasks.`;
      mainContainer.appendChild(counter);
    } catch (error) {
      alert("Error happened when displaying the todo list: " + error.message);
    }
  }

  counter.textContent = `You have ${todosList.length} tasks.`;
  mainContainer.appendChild(counter);
}

function addTodo() {
  const newTodo = todoInput.value;
  if (newTodo.trim() !== "") {
    if (newTodo.length <= 100) {
      const todo = { description: newTodo, done: false };
      todosList.push(todo);
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

function deleteTodo(index) {
  todosList.splice(index, 1);
  displayTodos(todosList);
  localStorage.setItem("todoList", JSON.stringify(todosList));
}

function searchTodo() {
  const searchTerm = searchInput.value.trim();
  const searchedList = todosList.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayTodos(searchedList);
  searchInput.value = "";
}

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

function doneCheck(index) {}

// --------------------------------Main-----------------------------
// to not refresh the page after submit the form
window.addEventListener("DOMContentLoaded", () => {
  try {
    searchContainer.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    searchButton.addEventListener("click", searchTodo);
    todosList = JSON.parse(localStorage.getItem("todoList"));
    inputContainer.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    addButton.addEventListener("click", addTodo);
  } catch (error) {
    alert("Unknown error happened: " + error.message);
  } finally {
    displayTodos(todosList);
  }
});
