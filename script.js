let todoField = document.querySelector(".your-todos")
let todoText = document.querySelector(".todo-input")
let addTodoBtn = document.querySelector(".add-todo-btn")
let editTodoText = document.querySelector(".EditNewTodo")
let closeTodoEditor = document.querySelector(".CloseNewTodo")
let newTodoText = document.querySelector(".newTodoText")
let modal =  document.querySelector(".modal")
let todoList = []

function addTodo() {
    if (todoText.value === ""){
        todoText.placeholder = "You should write something here"
        todoText.style.border = "2px solid red"
    }
    else{
        todoText.placeholder = "You should write something here"
        todoText.style.border = "2px solid black"

        let todo = {
            id: Date.now(),
            value: todoText.value,
            complete: false,
            favourite: false
        }
        todoList.push(todo)
        saveTodoLocalStorage()
        addTodoWindow()
    }
}

function addTodoWindow() {
    todoField.innerHTML = ""
    todoList.forEach(element => {
        todoField.innerHTML += `
        <div class="card" data-id="${element.id}">
        <p class = "${element.complete ? "complete-todo" : ""}">${element.value}</p>
        <div class = "row">
        <button class = "favourites ${element.favourite ? "active-favourite" : ""}"></button>
        <button class = "editbtn">Edit</button>
        <button class = "removebtn">Remove</button>
        </div>
        </div>
        `
    })
}


todoField.addEventListener("click", function(event) {
    let target = event.target
    let idInCard = target.closest(".card").dataset.id
    let index = todoList.findIndex(element => element.id == idInCard)

    if (target.closest(".removebtn"))  {
        todoList.splice(index, 1)
        addTodoWindow()
        saveTodoLocalStorage()
    }  

    if (target.closest(".editbtn")) {
        let textinField = target.closest(".card").querySelector("p")

        modal.classList.add("active-card")

        editTodoText.addEventListener("click", editNote)

        function editNote(){
            textinField.innerHTML = newTodoText.value
            todoList[index].value = newTodoText.value
            saveTodoLocalStorage()
        
        editTodoText.removeEventListener("click", editNote)
        closeEditNoteWindow()
        }
        newTodoText.value = ""
    }

    if (target.closest("p")) {
        target.classList.toggle("complete-todo")
        todoList[index].complete = !todoList[index].complete
        saveTodoLocalStorage()
    }

    if (target.closest(".favourites")) {
        target.classList.toggle("active-favourite")
        todoList[index].favourite = !todoList[index].favourite
        saveTodoLocalStorage()
    }
})

addTodoBtn.addEventListener("click", function(event) {
    event.preventDefault()
    addTodo()
    saveTodoLocalStorage()
    todoText.value = ""
})

function saveTodoLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todoList))
}

function getData() {
    let data = JSON.parse(localStorage.getItem("todo-list"))
    
    if (data) {
        todoList = data
        addTodoWindow()
    }
}

getData()
    
closeTodoEditor.addEventListener("click", closeEditNoteWindow)


function closeEditNoteWindow() {
    modal.classList.remove("active-card")
}

