//Read existing todos from local storage.
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save Todos to local storage.
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application Todos based on filters.
const renderTodos = function (todos, filters) {
  let filteredToDos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // Logic to hide the completed Todos when the checkbox is ticked.
  filteredTodos = filteredToDos.filter(function (todo) {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });
  // Print message saying how many todos are left.
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });
  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.
  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Generate the DOM paragraph for each new todo.
const generateTodoDOM = function (todo) {
  const addPara = document.createElement("p");
  addPara.textContent = todo.text;
  return addPara;
};
// Generate the incomplete Todos summary header.
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} Todos left`;
  return summary;
};
