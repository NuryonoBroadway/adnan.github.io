const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');
const demo = document.querySelector(".demo");

console.log(todolist.childNodes);

document.addEventListener("DOMContentLoaded", checkload);
todobutton.addEventListener("click", function (event) {
    event.preventDefault();
    if (todoInput.value == null || todoInput.value == "") {
        demo.classList.add("fill");
        demo.innerText = "Please fill out the input"
        setTimeout(function () {
            demo.classList.remove("fill");
            demo.innerText = "";
        }, 2000);
        return false
    }
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newtodo = document.createElement("li");
    newtodo.innerText = todoInput.value;
    newtodo.classList.add("todo-item")
    todoDiv.appendChild(newtodo);
    saveLocalTodos(todoInput.value);
    const completed = document.createElement('button');
    completed.innerHTML = '<i class="fas fa-check"></i>';
    completed.classList.add('completed-btn');
    todoDiv.appendChild(completed);
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('trash-btn');
    todoDiv.appendChild(trash);
    todolist.appendChild(todoDiv);
    todoInput.value = "";
});

todolist.addEventListener("click", function (event) {
    const item = event.target;
    console.log(item);
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
        if (todo.classList.contains('completed')) {
            removecheckTodos(todo)
        } else {
            removeLocalTodos(todo);
        }
    }
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        console.log(todo);
        todo.classList.toggle("completed");
        if (todo.classList.contains('completed')) {
            console.log("true")
            checkLocalTodos(todo);
            removeLocalTodos(todo);
        } else {
            console.log("false")
            let todos;
            if (localStorage.getItem('todos') === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem('todos'));
            }
            todos.push(todo.innerText);
            todos.sort();
            localStorage.setItem('todos', JSON.stringify(todos));
            removecheckTodos(todo);
        }
    } 
});

filteroption.addEventListener('click', function (event) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "UnCompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
});

function saveNote(todo) {
    let note;
    if (localStorage.getItem('note') === null) {
        note = [];
    } else {
        note = JSON.parse(localStorage.getItem('note'));
    }
    note.push(todo);
    note.sort();
    localStorage.setItem('note', JSON.stringify(note));
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    todos.sort();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    todos.sort();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removecheckTodos(todo) {
    let newcheck;
    if (localStorage.getItem('newcheck') === null) {
        newcheck = [];
    } else {
        newcheck = JSON.parse(localStorage.getItem('newcheck'));
    }
    const todoindex = todo.children[0].innerText;
    newcheck.splice(newcheck.indexOf(todoindex), 1);
    newcheck.sort();
    localStorage.setItem('newcheck', JSON.stringify(newcheck));
}

function checkLocalTodos(todo) {
    let newcheck;
    if (localStorage.getItem('newcheck') === null) {
        newcheck = [];
    } else {
        newcheck = JSON.parse(localStorage.getItem('newcheck'));
    }
    newcheck.push(todo.innerText)
    newcheck = newcheck.filter(function (item, index, inputarray) {
        return inputarray.indexOf(item) == index;
    });
    newcheck.sort();
    localStorage.setItem('newcheck', JSON.stringify(newcheck));
}

function checkload(event) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let newcheck;
    if (localStorage.getItem('newcheck') === null) {
        newcheck = [];
    } else {
        newcheck = JSON.parse(localStorage.getItem('newcheck'));
    }
    event.preventDefault();
    todos = todos.filter(function (item) {
        return !newcheck.includes(item);
    });
    todos.sort();
    localStorage.setItem('todos', JSON.stringify(todos));
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newtodo = document.createElement("li");
        newtodo.innerText = todo;
        newtodo.classList.add("todo-item")
        todoDiv.appendChild(newtodo);
        const completed = document.createElement('button');
        completed.innerHTML = '<i class="fas fa-check"></i>';
        completed.classList.add('completed-btn');
        todoDiv.appendChild(completed);
        const trash = document.createElement('button');
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        trash.classList.add('trash-btn');
        todoDiv.appendChild(trash);
        todolist.appendChild(todoDiv);
    });

    newcheck.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newtodo = document.createElement("li");
        newtodo.innerText = todo;
        newtodo.classList.add("todo-item")
        todoDiv.appendChild(newtodo);
        const completed = document.createElement('button');
        completed.innerHTML = '<i class="fas fa-check"></i>';
        completed.classList.add('completed-btn');
        todoDiv.appendChild(completed);
        const trash = document.createElement('button');
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        trash.classList.add('trash-btn');
        todoDiv.appendChild(trash);
        todolist.appendChild(todoDiv);
        todoDiv.classList.toggle("completed");
    });
}