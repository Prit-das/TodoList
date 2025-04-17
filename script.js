let todobody = document.querySelector(".todobody");
let day = document.querySelector("#day");
let date = document.querySelector("#date");
let todolist = document.querySelector(".todobodycontent");
let addicon = document.querySelector(".addicon");
let icon = document.querySelector("#icon");
let addinlist = document.querySelector("#addinlist");
let submit = document.querySelector("#submit");
let menu = document.querySelector('#menu');
let menuList = document.querySelector('#menuList');
let titleInput = document.querySelector("#title_input");
let dateInput = document.querySelector("#date_input");
let checkbox = document.querySelector('#input_check');

let records = [];
let today = new Date();

let formattedDate = today.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
date.textContent = `${formattedDate}`;

addicon.addEventListener("click", () => {
  if (addinlist.classList.contains("disableInp")) {
    addinlist.classList.toggle("disableInp");
    addinlist.classList.toggle("activeInput");
    todobody.classList.add("blur");
    icon.className = "bi bi-dash-circle-fill";
  } else {
    addinlist.classList.toggle("activeInput");
    addinlist.classList.toggle("disableInp");
    todobody.classList.remove("blur");
    icon.className = "bi bi-plus-circle-fill";
  }
});

function appendTodo(title, dateIn, id) {
  let formattedDate = new Date(dateIn).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let html = `<div class="contents" data-id="${id}">
                <div class="radioP">
                    <input type="checkbox">
                    <p id="taskTitle">${title}</p>
                </div>
                <p>${dateIn}</p>
              </div>`;

  todolist.insertAdjacentHTML('beforeend', html);
}

function addTodo() {
  let title = titleInput.value;
  let dateIn = dateInput.value;

  if (title.trim() === "" && dateIn.trim() === "") {
    return;
  }

  let todo = {
    id: Date.now(),
    title,
    dateIn,
  };

  records.push(todo);
  localStorage.setItem('todoRecords', JSON.stringify(records));
  appendTodo(title, dateIn, todo.id);

  titleInput.value = '';
  dateInput.value = '';
}

// Submit button
submit.addEventListener("click", () => {
  addTodo();
  addinlist.classList.remove("activeInput");
  addinlist.classList.add("disableInp");
  icon.className = "bi bi-plus-circle-fill";
  todobody.classList.remove("blur");
});

// Load from localStorage
window.addEventListener('load', () => {
  records = JSON.parse(localStorage.getItem('todoRecords'));
  if (records) {
    records.forEach(record => {
      appendTodo(record.title, record.dateIn, record.id);
    });
  } else {
    records = [];
  }
});

// Toggle menu
menu.addEventListener('click', () => {
  menuList.classList.toggle('disableMenu');
});

// Delete checked items
let itemOne = document.querySelector('.itemOne');

itemOne.addEventListener('click', () => {
  let contents = document.querySelectorAll('.contents');

  contents.forEach((ele) => {
    let checkbox = ele.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      let id = ele.getAttribute('data-id');

      // Remove from records array
      records = records.filter(record => record.id != id);

      // Remove from DOM
      ele.remove();
    }
  });

  // Update localStorage once after loop
  localStorage.setItem('todoRecords', JSON.stringify(records));
});