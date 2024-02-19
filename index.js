/* eslint-disable no-unused-vars */
const todosList = [
  { description: "I want to improve my skills", done: false },
  { description: "I want to do my laundry", done: false },
  { description: "I have to go to do my nails", done: false },
  { description: "I have to go to do my nails", done: false },
  { description: "I have to go to do my nails", done: false },
  { description: "I have to go to do my nails", done: false },
];

const mainContainer = document.getElementById("container");
const todosContainer = document.getElementById("todos-container");

function displayTodos() {
  if (todosList.length > 0) {
    for (let i = 0; i < todosList.length; i++) {
      const todoRow = document.createElement("div");
      todoRow.id = "todo-row";

      const doneCheckbox = document.createElement("input");
      doneCheckbox.type = "checkbox";
      todoRow.appendChild(doneCheckbox);

      const todoText = document.createElement("p");
      todoText.textContent = todosList[i].description;
      todoRow.appendChild(todoText);

      const deleteButton = document.createElement("button");
      deleteButton.id = "delete-btn";
      deleteButton.textContent = "Delete";
      todoRow.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.id = "edit-btn";
      editButton.textContent = "Edit";
      todoRow.appendChild(editButton);

      todosContainer.appendChild(todoRow);
      mainContainer.appendChild(todosContainer);
    }
  }
}

displayTodos();
