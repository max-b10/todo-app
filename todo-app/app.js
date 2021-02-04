const toDos = [
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

// Print message saying how many toDos are left.
const incompleteToDos = toDos.filter(function (todo) {
  return !todo.completed;
});

const summary = document.createElement("h2");
summary.textContent = `You have ${incompleteToDos.length} To Dos left`;
document.querySelector("body").appendChild(summary);

// Add a paragragh for each ToDo in the array.
toDos.forEach(function (object) {
  const addPara = document.createElement("p");
  addPara.textContent = object.text;
  document.querySelector("body").appendChild(addPara);
});

// let ps = document.querySelectorAll("p");

// ps.forEach(function (para) {
//   if (para.textContent.includes("the")) {
//     para.remove();
//   }
// });
