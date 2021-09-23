// Selectors;
const $todoInput = document.querySelector(".todo-input");
const $todoButton = document.querySelector(".todo-button");
const $todoList = document.querySelector(".todo-list");
const $listFilter = document.querySelector(".list-filter");

// Event Listeners
document.addEventListener('DOMContentLoaded',render);
$todoButton.addEventListener('click', addTodo);
$todoList.addEventListener('click', deleteCheck);
$listFilter.addEventListener('click', todoFilter);

// Functions

function addTodo(e) {
    e.preventDefault();
    const $todo = document.createElement("div");
    $todo.classList.add("todo");

    const $todoItem = document.createElement("li");
    $todoItem.classList.add("todoItem");
    $todoItem.textContent = $todoInput.value;
    saveLocalStorage($todoInput.value);
    $todo.appendChild($todoItem);

    const $checkBtn = document.createElement("button");
    $checkBtn.classList.add("checkBtn");
    $checkBtn.innerHTML = '<i class="far fa-check-circle"></i>';
    $todo.appendChild($checkBtn);

    const $deleteBtn = document.createElement("button");
    $deleteBtn.classList.add("deleteBtn");
    $deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    $todo.appendChild($deleteBtn);

    $todoList.appendChild($todo);

    $todoInput.value = "";
}

function deleteCheck(e){
    if(e.target.classList[0] === 'deleteBtn'){
        const list = e.target.parentElement;
        list.classList.add("fall");
        list.addEventListener('transitionend',(e)=>{
            if(e.propertyName === 'transform'){
                removeLocalStorage(e.target.innerText);
                list.remove();  
            }
        })
        
    }
    if(e.target.classList[0] === 'checkBtn'){
        const list = e.target.parentElement;
        list.classList.toggle('completed');
    }
}

function todoFilter(e){
    let todo = $todoList.childNodes;
    todo.forEach((todo)=>{
        switch(e.target.value){
            case 'all' :
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function localStorageSetting(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function saveLocalStorage(todo){
    let todos = localStorageSetting();
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeLocalStorage(todo){
    let todos = localStorageSetting();
    todos.splice(todos.indexOf(todo),1);
    console.log(todos);
    localStorage.setItem("todos",JSON.stringify(todos));
    return todos;
}

function render(){
    let todos = localStorageSetting();
    todos.forEach((todo)=>{
        const $todo = document.createElement("div");
        $todo.classList.add("todo");
    
        const $todoItem = document.createElement("li");
        $todoItem.classList.add("todoItem");
        $todoItem.textContent = todo;
        
        $todo.appendChild($todoItem);
    
        const $checkBtn = document.createElement("button");
        $checkBtn.classList.add("checkBtn");
        $checkBtn.innerHTML = '<i class="far fa-check-circle"></i>';
        $todo.appendChild($checkBtn);
    
        const $deleteBtn = document.createElement("button");
        $deleteBtn.classList.add("deleteBtn");
        $deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        $todo.appendChild($deleteBtn);
    
        $todoList.appendChild($todo);
    })
}