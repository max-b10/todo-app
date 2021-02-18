"use strict";

const todos = getSavedTodos();

// A filters object acting as one of the parameters in the renderToDos function.
const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);
// Search Text filter, which calls renderTodos after each user input.
document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

// Stopping default behaviour(submission) of the submit button field.
// Then pushing on the createToDo value.
document.querySelector("#createTodoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  // if logic so that a todo is only added if there is content in the input:
  if (text.length > 0) {
    // Push a new object to the todos array:
    todos.push({
      id: uuidv4(),
      text, // This can be written as text: text, but it's not necessary.
      completed: false,
    });
    saveTodos(todos);
    //Rerender the list of todos:
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  }
});

// Event Listener for hideCompleted checkbox.
document.querySelector("#hideCompleted").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
