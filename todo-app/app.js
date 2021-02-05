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

const filters = {
  searchText: "",
};
const renderToDos = function (todos, filters) {
  const filteredToDos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
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
  filteredToDos.forEach(function (object) {
    const addPara = document.createElement("p");
    addPara.textContent = object.text;
    document.querySelector("#todos").appendChild(addPara);
  });
};
renderToDos(todos, filters);

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
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    renderToDos(todos, filters);
    e.target.elements.text.value = "";
  });
