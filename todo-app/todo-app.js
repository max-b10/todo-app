const todos = getSavedTodos();

// A filters object acting as one of the parameters in the renderToDos function.
const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);
// Search Text filter, which calls renderTodos after each user input.
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

// Stopping default behaviour(submission) of the submit button field.
// Then pushing on the createToDo value.
document
  .querySelector("#createTodoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Push a new object to the todos array:
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    saveTodos(todos);
    //Rerender the list of todos:
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  });

// Event Listener for hideCompleted checkbox.
document
  .querySelector("#hideCompleted")
  .addEventListener("change", function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
