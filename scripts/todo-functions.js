"use strict";

//Read existing todos from local storage.
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save Todos to local storage.
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove a todo from the list by Id.
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo.
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render application Todos based on filtered search.
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todos");
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  // Logic to hide the completed Todos when the checkbox is ticked.
  filteredTodos = filteredTodos.filter(function (todo) {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  // Print message saying how many todos are left.
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No Todos to match your search";
    todoEl.appendChild(messageEl);
  }
};

// Generate the DOM elements for each new todo.
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup the todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);
  // Setup the remove button
  removeButton.textContent = "Remove Todo";
  // Adding classes to the newly generated remove buttons per todo:
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Generate the incomplete Todos summary header.
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  if (incompleteTodos.length > 1) {
    summary.textContent = `You have ${incompleteTodos.length} Todos left`;
  } else if (incompleteTodos.length === 1) {
    summary.textContent = `You have ${incompleteTodos.length} Todo left`;
  }
  return summary;
};
