/* eslint-disable no-unused-vars */
const todosList = [
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

function displayTodos() {
  todosContainer.innerHTML = "";
  if (todosList.length > 0) {
    for (let i = 0; i < todosList.length; i++) {
      const todoRow = document.createElement("div");
      todoRow.id = "todo-row";

      const doneCheckbox = document.createElement("input");
      doneCheckbox.type = "checkbox";
      doneCheckbox.checked = todosList[i].done;
      todoRow.appendChild(doneCheckbox);

      const todoText = document.createElement("p");
      todoText.textContent = todosList[i].description;
      todoRow.appendChild(todoText);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteButton.className = "row-btn";
      todoRow.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
      editButton.className = "row-btn";
      todoRow.appendChild(editButton);

      todosContainer.appendChild(todoRow);
      mainContainer.appendChild(todosContainer);
    }
  }
}

function addTodo() {
  const newTodo = todoInput.value;
  if (newTodo.trim() !== "") {
    const todo = { description: newTodo, done: false };
    todosList.push(todo);
    displayTodos();
    todoInput.value = ""; // Clear the input after adding
  } else {
    alert("Please enter a todo item.");
  }
}

// --------------------------------Main-----------------------------
displayTodos();
addButton.addEventListener("click", addTodo);
