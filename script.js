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

// Inserting tasks and priority values into each item on the list & looping the items on the list

btn.addEventListener("click", function () {
  if (taskInput.value !== "" && priorityInput.value !== "") {
    // create div box for new task
    const item = document.createElement("div");
    item.classList.add("item");

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
  }
});

// add an event listener for deleting tasks
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    $(event.target.parentElement).fadeOut(function () {
      $(this).remove();
    });
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
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  itemList.appendChild(fragment);
}

// Event listener for sort dropdown change
document.getElementById("sort-name").addEventListener("change", sortItems);
