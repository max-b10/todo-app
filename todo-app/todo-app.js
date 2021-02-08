const todos = [
  {
    text: "Order cat food",
    completed: true,
  },
  {
    text: "Clean Kitchen",
    completed: false,
  },
  {
    text: "Exercise",
    completed: true,
  },
  {
    text: "Do some work",
    completed: false,
  },
  {
    text: "Got to bed",
    completed: true,
  },
];

// A filters object acting as one of the parameters in the renderToDos function.
const filters = {
  searchText: "",
  hideCompleted: false,
};
const renderToDos = function (todos, filters) {
  let filteredToDos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // Logic to hide the completed ToDos when the checkbox is ticked.
  filteredToDos = filteredToDos.filter(function (todo) {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  // Print message saying how many toDos are left.
  const incompleteToDos = filteredToDos.filter(function (todo) {
    return !todo.completed;
  });
  // Using innerHTML wipes out the div of any previous html before adding the filtered notes.

  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteToDos.length} To Dos left`;
  document.querySelector("#todos").appendChild(summary);

  // Add a paragragh for each ToDo in the array.
  filteredToDos.forEach(function (todo) {
    const addPara = document.createElement("p");
    addPara.textContent = todo.text;
    document.querySelector("#todos").appendChild(addPara);
  });
};
renderToDos(todos, filters);
// Search Text filter, which calls renderToDos after each user input.
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderToDos(todos, filters);
});

// Stopping default behaviour(submission) of the submit button field.
// Then console logging the createToDo value.
document
  .querySelector("#createToDoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Push a new object to the todos array:
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    //Rerender the list of todos:
    renderToDos(todos, filters);
    e.target.elements.text.value = "";
  });

// Event Listener for hideCompleted checkbox.
document
  .querySelector("#hideCompleted")
  .addEventListener("change", function (e) {
    filters.hideCompleted = e.target.checked;
    renderToDos(todos, filters);
  });
