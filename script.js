const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deletAllBtn = document.querySelector('.footer button');
const body = document.querySelector('body');
const mode = document.querySelector('.mode');

mode.addEventListener('click', () => {
    body.classList.toggle('dark');
});

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    
    if(userData.trim() != 0){
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
};

showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('New ToDo');
    if(getLocalStorage == null) {
        listArr =[];
    } else {
        listArr = JSON.parse(getLocalStorage)
    }
    listArr.push(userData);
    localStorage.setItem('New ToDo', JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove('active');
};

function showTasks(){
    let getLocalStorage = localStorage.getItem('New ToDo');

    if(getLocalStorage == null) {
        listArr =[];
    } else {
        listArr = JSON.parse(getLocalStorage)
    }
    const pedingNumb = document.querySelector('.pedingNumb');
    pedingNumb.textContent = listArr.length;
    let newLiTag = '';
    if(listArr.length > 0){
        deletAllBtn.classList.add('active');
    } else {
        deletAllBtn.classList.remove('active');
    }
    listArr.forEach((elem, index) => {
        newLiTag += `<li class='todoList_item'>${elem}<span onclick='deletTask(${index})'>&cross;</span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
    inputBox.focus();
};

function deletTask(index){
    let getLocalStorage = localStorage.getItem('New ToDo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem('New ToDo', JSON.stringify(listArr));
    showTasks();
};

deletAllBtn.addEventListener('click', ()=>{
    listArr = [];
    localStorage.setItem('New ToDo', JSON.stringify(listArr));
    showTasks();
});
