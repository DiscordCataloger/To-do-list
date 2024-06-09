// JQuery script
const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
document.getElementsByTagName("head")[0].appendChild(script);

// Extracting HTML elements out of index.html using DOM methods
let taskInput = document.querySelector("input[name]");
const priorityInput = document.querySelector("select[name]");
const itemList = document.getElementsByClassName("list")[0];
const btn = document.getElementsByTagName("button")[0];
const textarea = document.getElementById("textarea");
const sortValue = document.getElementById("sort-name").value;
let deleteBtn;

// defining form and making it sure submission doesn't result to reloading
let form = document.querySelector("form");

// parchment background randomizer
const backgroundImageUrls = [
  "./backgrounds/parchment-item.png",
  "./backgrounds/parchment-item2.png",
  "./backgrounds/parchment-item3.png",
  "./backgrounds/parchment-item4.png",
  "./backgrounds/parchment-item5.png",
];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch(form.action, {
    method: "post",
    body: new FormData(form),
  });
});

// Check if localStorage is supported by the browser
if (typeof localStorage !== "undefined") {
  // Retrieve tasks from localStorage if available
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    // Parse the stored tasks JSON string into an array
    const tasks = JSON.parse(storedTasks);

    // Render the stored tasks on the page
    tasks.forEach((task) => {
      renderTask(task);
    });
  }
} else {
  console.log("localStorage is not supported in this browser.");
}

// Function to save tasks to localStorage
function saveToLocalStorage() {
  // Get all the task elements
  const items = document.getElementsByClassName("item");

  // Create an array to store the tasks
  const tasks = Array.from(items).map((item) => {
    const taskName = item.querySelector(".task-name").innerText;
    const priority = item.querySelector(".priority-box").innerText;

    // Create an object representing the task as an array item
    return {
      name: taskName,
      priority: priority,
    };
  });

  // Convert the tasks array to JSON string & save them in localStorage

  // Save the tasks JSON string to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTask(task) {
  // Create div box for new task and add text div box and delete button to it
  const itemBox = document.createElement("div");
  itemBox.classList.add("item-field");
  let itemField = itemList.appendChild(itemBox);
  itemText = document.createElement("div");
  itemText.classList.add("item");
  itemField.appendChild(itemText);

  // Create task name element
  const taskName = document.createElement("h2");
  taskName.classList.add("task-name");
  taskName.innerText = task.name;

  // Create priority element
  const priority = document.createElement("div");
  priority.classList.add("priority-box");
  priority.innerText = task.priority;

  // set background color based on priority value
  if (priority.innerText === "low") {
    priority.style.backgroundColor = "green";
    priority.style.color = "white";
  } else if (priority.innerText === "medium") {
    priority.style.backgroundColor = "yellow";
    priority.style.color = "black";
  } else if (priority.innerText === "high") {
    priority.style.backgroundColor = "red";
    priority.style.color = "#FEFEE1";
  }

  itemText.appendChild(taskName);
  itemText.appendChild(priority);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");

  // Append task name, priority, and delete button to the task element

  itemField.appendChild(deleteBtn);

  // add background image
  const randomImageUrl =
    backgroundImageUrls[Math.floor(Math.random() * backgroundImageUrls.length)];

  // add task
  itemField.style.backgroundImage = `url(${randomImageUrl})`;

  // Append the task to the task list
  itemList.appendChild(itemField);
}

// Inserting tasks and priority values into each item on the list & looping the items on the list

btn.addEventListener("click", function () {
  if (taskInput.value !== "" && priorityInput.value !== "") {
    // add new task name to the div box
    const task = document.createElement("h2");
    task.classList.add("task-name");

    // add priority to the task
    const priority = document.createElement("div");
    priority.classList.add("priority-box");

    // add delete button to the task
    deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");

    // set background color based on priority value
    if (priorityInput.value === "low") {
      priority.style.backgroundColor = "green";
      priority.style.color = "white";
    } else if (priorityInput.value === "medium") {
      priority.style.backgroundColor = "yellow";
      priority.style.color = "black";
    } else if (priorityInput.value === "high") {
      priority.style.backgroundColor = "red";
      priority.style.color = "#FEFEE1";
    }

    // append the div box to the item list, and 2 divs to the div box itself
    let itemBox = document.createElement("div");
    itemBox.classList.add("item-field");
    let itemField = itemList.appendChild(itemBox);

    itemText = document.createElement("div");
    itemText.classList.add("item");
    itemField.appendChild(itemText);
    itemField.appendChild(deleteBtn);

    // add background image
    const randomImageUrl =
      backgroundImageUrls[
        Math.floor(Math.random() * backgroundImageUrls.length)
      ];

    // add task
    itemField.style.backgroundImage = `url(${randomImageUrl})`;
    $(itemField).hide().fadeIn();

    task.innerText = taskInput.value;
    itemText.appendChild(task);

    priority.innerText =
      priorityInput.value.charAt(0).toUpperCase() +
      priorityInput.value.slice(1);

    itemText.appendChild(priority);
    // save the data into localStorage
    saveToLocalStorage();
  }
});

// add an event listener for deleting tasks
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    $(event.target.parentElement).fadeOut(function () {
      $(this).remove();
    });
    // Remove the task from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter((task) => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
});

// Breakpoints
const breakpoints = [768, 992];

// Function to change the input type
function changeInputType() {
  const windowWidth = window.innerWidth;

  if (windowWidth <= breakpoints[0]) {
    // Mobile

    $("#textarea").show();
    $(".text-field").hide();
    $("#textarea").focus();
    textarea.style.fontFamily = "Angel wish regular";
    textarea.style.width = "200px";
    textarea.style.height = "150px";
    textarea.style.fontSize = "25px";
    taskInput = textarea;
  } else if (windowWidth <= breakpoints[1]) {
    // Tablet
    $("#textarea").show();
    $(".text-field").hide();
    $("#textarea").focus();
    textarea.style.fontFamily = "Angel wish regular";
    textarea.style.width = "400px";
    textarea.style.height = "200px";
    textarea.style.fontSize = "25px";
    taskInput = textarea;
  } else {
    // Desktop
    $(".text-field").show();
    $("#textarea").hide();
    $(".text-field").focus();
    taskInput = document.querySelector("input[name]");
  }
}
window.addEventListener("load", changeInputType);
window.addEventListener("resize", changeInputType);

// Function to sort the items based on selected sort option
function sortItems() {
  const sortValue = document.getElementById("sort-name").value;
  const items = Array.from(document.getElementsByClassName("item-field"));

  items.sort((a, b) => {
    const taskA = a.querySelector(".task-name").innerText.toLowerCase();
    const taskB = b.querySelector(".task-name").innerText.toLowerCase();
    const priorityA = a.querySelector(".priority-box").innerText.toLowerCase();
    const priorityB = b.querySelector(".priority-box").innerText.toLowerCase();

    if (sortValue === "ascending") {
      return taskA.localeCompare(taskB);
    } else if (sortValue === "descending") {
      return taskB.localeCompare(taskA);
    }

    if (sortValue === "low") {
      if (priorityA === "low" && priorityB === "low") {
        return taskA.localeCompare(taskB);
      } else if (priorityA === "low") {
        return -1;
      } else if (priorityB === "low") {
        return 1;
      }
    } else if (sortValue === "medium") {
      if (priorityA === "medium" && priorityB === "medium") {
        return taskA.localeCompare(taskB);
      } else if (priorityA === "medium") {
        return -1;
      } else if (priorityB === "medium") {
        return 1;
      }
    } else if (sortValue === "high") {
      if (priorityA === "high" && priorityB === "high") {
        return taskA.localeCompare(taskB);
      } else if (priorityA === "high") {
        return -1;
      } else if (priorityB === "high") {
        return 1;
      }
    }

    return 0;
  });

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    fragment.appendChild(item);
  });

  const itemList = document.querySelector(".list");

  // remove every item on the list (until there are no items) before filtering
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  itemList.appendChild(fragment);
}

// Event listener for sort dropdown change
document.getElementById("sort-name").addEventListener("change", sortItems);
