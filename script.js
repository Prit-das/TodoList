let todobody = document.querySelector('.todobody');
let day = document.querySelector('#day');
let date = document.querySelector('#date');
let todolist = document.querySelector('.todobodycontent');
let addicon = document.querySelector('.addicon');
let icon = document.querySelector('#icon');
let addinlist = document.querySelector('#addinlist');
let submit = document.querySelector('#submit');

let data = addinlist.querySelectorAll('input');
let records = [];

let today = new Date();

let formattedDate = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
date.textContent = `${formattedDate}`;


addicon.addEventListener('click', () => {
    if (addinlist.classList.contains('disableInp')) {
        addinlist.classList.toggle('disableInp');
        addinlist.classList.toggle('activeInput');
        todobody.classList.add('blur');
        icon.className = 'bi bi-dash-circle-fill';
    }
    else{
        addinlist.classList.toggle('activeInput');
        addinlist.classList.toggle('disableInp');
        todobody.classList.remove('blur');
        icon.className = 'bi bi-plus-circle-fill';
    }
})
submit.addEventListener('click', () => {

    let isEmpty = false;
    data.forEach((input) => {
        if (input.value.trim() === '') {
            isEmpty = true;
        }
    });

    if (isEmpty) {
        return;
    }

    let todocontent = document.createElement('div');
    todocontent.className = 'contents';

    let radioTitle = document.createElement('div');
    radioTitle.className = 'radioP';

    let check = document.createElement('input');
    check.type = 'checkbox';

    let taskTitle = document.createElement('p');

    let time = document.createElement('p');

    todolist.appendChild(todocontent);
    todocontent.appendChild(radioTitle);
    radioTitle.appendChild(check);
    radioTitle.appendChild(taskTitle);
    todocontent.appendChild(time);

    data.forEach((input)=>{
        records.push(input.value);
        input.value = '';
    })

    let len = records.length;
    taskTitle.textContent = records[len - 2];
    time.textContent = records[len - 1];

    addinlist.classList.remove('activeInput');
    addinlist.classList.add('disableInp');
    icon.className = 'bi bi-plus-circle-fill';
    todobody.classList.remove('blur');
})