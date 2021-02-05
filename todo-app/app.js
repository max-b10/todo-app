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

//Change text content of event taregt (the button) when clicked.
document.querySelector("#add-todo").addEventListener("click", function (e) {
  e.target.textContent = "To Do Added";
});
// Listen for To Do text change.
document
  .querySelector("#new-todo-text")
  .addEventListener("input", function (e) {
    console.log(e.target.value);
  });

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderToDos(todos, filters);
});
