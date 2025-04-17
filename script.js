let todobody = document.querySelector(".todobody");
let day = document.querySelector("#day");
let date = document.querySelector("#date");
let todolist = document.querySelector(".todobodycontent");
let addicon = document.querySelector(".addicon");
let icon = document.querySelector("#icon");
let addinlist = document.querySelector("#addinlist");
let submit = document.querySelector("#submit");

let titleInput = document.querySelector("#title_input");
let dateInput = document.querySelector("#date_input");

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

function appendTodo(title,dateIn){

    let html = `<div class="contents">
                    <div class="radioP">
                        <input type="checkbox">
                        <p id="taskTitle">${title}</p>
                    </div>
                    <p>${dateIn}</p>
                </div>`

    todolist.insertAdjacentHTML('beforeend',html);
}


function addTodo() {
  let title = titleInput.value;
  let dateIn = dateInput.value;
  let todo = {
    title,
    dateIn,
  };
  if (title.trim() == "" && dateIn.trim() == "") {
    return;
  }
  records.push(todo);
  localStorage.setItem('todoRecords',JSON.stringify(records));
  appendTodo(title,dateIn);
  dateInput.value = '';
  titleInput.value = '';
}

submit.addEventListener("click", () => {
  addTodo();
  addinlist.classList.remove("activeInput");
  addinlist.classList.add("disableInp");
  icon.className = "bi bi-plus-circle-fill";
  todobody.classList.remove("blur");
});


window.addEventListener('load',()=>{
  records = JSON.parse(localStorage.getItem('todoRecords'));
    if (records) {
        records.forEach(record => {
            appendTodo(record.title,record.dateIn)
        })     
    }else {
      records = [];
    }
})
