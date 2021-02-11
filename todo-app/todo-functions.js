//Read existing todos from local storage.
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
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
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

// Render application Todos based on filters.
const renderTodos = (todos, filters) => {
  let filteredToDos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  // Logic to hide the completed Todos when the checkbox is ticked.
  filteredTodos = filteredToDos.filter(function (todo) {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  // Print message saying how many todos are left.
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Generate the DOM elements for each new todo.
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup the todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  // Setup the remove button
  removeButton.textContent = "Remove Todo";
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
  summary.textContent = `You have ${incompleteTodos.length} Todos left`;
  return summary;
};
