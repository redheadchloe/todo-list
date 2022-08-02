const btn = document.querySelector('button');
const input = document.querySelector('input');
const todoList = document.querySelector('.todo-wrapper');
const filterBtn = document.querySelector('.filter');

btn.addEventListener('click', e => {
    // prevent form from submitting
    e.preventDefault();
    addTodo();
});
input.addEventListener('keypress', key => {
    if (key.keyCode === 13) {
        addTodo();
    }
});
// add event listener on the parent
todoList.addEventListener('click', dltCheck);
// add event listener on filter
// cannot use click because the event only listens when the select is clicked, not the actual options
filterBtn.addEventListener('change', filterTodo);
// load list on page load
window.addEventListener('DOMContentLoaded', getTodo);




function addTodo() {
    if (input.value === '') {
        return;
    }
    // to do div
    todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // to do list
    newTodo = document.createElement('li');
    newTodo.innerText = input.value;
    todoDiv.classList.add('focus');
    newTodo.classList.add('todo-item');


    // append li inside div
    todoDiv.appendChild(newTodo);

    // check and dlt btns
    checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add('done');

    todoDiv.appendChild(checkBtn);

    dltBtn = document.createElement('button');
    dltBtn.innerHTML = '<i class="fas fa-trash"></i>';
    dltBtn.classList.add('delete');
    todoDiv.appendChild(dltBtn);

    // apend everything created inside ul todoList
    todoList.appendChild(todoDiv);

    // add todo to local storage beforing emptying it
    saveTodo();
    // clear input value
    input.value = '';
}
//local storage
function saveTodo() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // add new todo item to the existing array
    todos.push(input.value);

    // add the array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);
}
// get todo on load
function getTodo() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // console.log(todos);
    // console.log(todos.length);
    if (todos.length > 0) {
        todos.forEach(function (todo) {
            todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            // to do list
            newTodo = document.createElement('li');
            newTodo.innerText = todo;
            todoDiv.classList.add('focus');
            newTodo.classList.add('todo-item');


            // append li inside div
            todoDiv.appendChild(newTodo);

            // check and dlt btns
            checkBtn = document.createElement('button');
            checkBtn.innerHTML = '<i class="fas fa-check"></i>';
            checkBtn.classList.add('done');

            todoDiv.appendChild(checkBtn);

            dltBtn = document.createElement('button');
            dltBtn.innerHTML = '<i class="fas fa-trash"></i>';
            dltBtn.classList.add('delete');
            todoDiv.appendChild(dltBtn);

            // apend everything created inside ul todoList
            todoList.appendChild(todoDiv);

        })
    }
}


// enable check and dlt btn
function dltCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    if (item.classList[0] === 'delete') {
        todo.classList.add('fall');
        removeTodo(todo);
        // instantly removes the item, which is not ideal, we want to wait until the transition is done and then remove the item;
        // todo.remove();
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.classList[0] === 'done' || item.classList[0] === 'todo-item') {
        todo.classList.toggle('done');
    }
}


// filter to do
function filterTodo(e) {
    const todoItem = todoList.childNodes;
    todoItem.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'done':
                if (todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
            case 'completing':
                if (!todo.classList.contains('done')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
        }
    });
}

function removeTodo(todo) {
    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);
}