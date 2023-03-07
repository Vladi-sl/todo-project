class TODOItem{
    constructor(text, status){
        this.text = text
        this.status = status
    }
}

const UNCOMPLETED = "UNCOMPLETED"
const COMPLETED = "COMPLETED"

//selector
const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const todoButton = document.querySelector('.todo-button')
const filterSelect = document.querySelector('.filter-todo')

//event listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterSelect.addEventListener('click', filterTodo )
document.addEventListener('DOMContentLoaded', getTodos)

//функция обработчик
function addTodo(event){
    //отменить обновление страницы по умолчанию
    event.preventDefault()

    //создать контейнер для задачи
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //добавить li
    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-item')
    todoLi.innerText = todoInput.value
    let newtd = new TODOItem(todoInput.value, UNCOMPLETED)
    savelocal(newtd)

    // check
    const completebtn = document.createElement('button')
    completebtn.innerHTML = '<i class="fas fa-check"></i>'
    completebtn.classList.add('complete-btn')

    // xmark
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('trash-btn')

    todoDiv.appendChild(todoLi)
    todoDiv.appendChild(completebtn)
    todoDiv.appendChild(deleteBtn)

    todoList.appendChild(todoDiv)
}

function deleteCheck(event){
    const element = event.target
    const todo = element.parentElement

    // нажатие на delete
    if(element.classList[0] === 'trash-btn'){
        //animation
        todo.classList.add('fall')
        removeLocalTodos(todo.children[0].innerText)
        todo.addEventListener('transitionend', todo.remove)
    }

    //нажатие на check
    if(element.classList[0] === 'complete-btn'){
        todo.classList.toggle('completed')
        const newTD = new TODOItem(todo.children[0].innerText, COMPLETED) 
        savelocal(newTD)
        filterTodo()
    }
}

function filterTodo(){
    const todos =todoList.childNodes

    //console.log(event.target.value)
    todos.forEach(todo => {
        switch(filterSelect.value){
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else{
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else{
                    todo.style.display = 'none'
                }
                break
        }        
    })
}


function savelocal(newTodo){
    // проверить если в хранилище что-то
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    } else{
        //или массив, где уже что-то есть
        todos = JSON.parse(localStorage.getItem('todos')) 
    }

    const itemIndex = todos.findIndex(item => {
        if(item.text === newTodo.text){
            return true
        }
    })


    if(itemIndex === -1){
        todos.push(newTodo)
    } else{
        if(todos[itemIndex].status === COMPLETED){
            newTodo.status = UNCOMPLETED
        } else{
            newTodo.status = COMPLETED
        }

        todos[itemIndex] = newTodo
    }

    //добавляем задачу в хранилище
   // todos.push(newTodo)
    //обновляем массив -> старый + новый 
    localStorage.setItem('todos', JSON.stringify(todos) )
}       


function getTodos(){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => createTodoItem(todo))
}

function removeLocalTodos(todoText){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    } else{
        //или массив, где уже что-то есть
        todos = JSON.parse(localStorage.getItem('todos')) 
    }

    const todoIndex = todos.findIndex((element) => {
        if(element.text === todoText){
            return true
        } 
    })

    if(todoIndex != -1){
        todos.splice(todoIndex, 1)
    }
    // todoValue = todo.children[0].innerText
    // todoIndex = todos.indexOf(todoValue)
    // todos.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodoItem(todoObj){
        //создать контейнер для задачи
   const todoDiv = document.createElement('div')
   todoDiv.classList.add('todo')

   //добавить li
   const todoLi = document.createElement('li')
   todoLi.classList.add('todo-item')
   todoLi.innerText = todoObj.text
   if(todoObj.status === COMPLETED){
       todoDiv.classList.toggle("completed")
   }

   todoDiv.appendChild(todoLi)

   // check
   const completebtn = document.createElement('button')
   completebtn.innerHTML = '<i class="fas fa-check"></i>'
   completebtn.classList.add('complete-btn')

   // xmark
   const deleteBtn = document.createElement('button')
   deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
   deleteBtn.classList.add('trash-btn')

   todoDiv.appendChild(todoLi)
   todoDiv.appendChild(completebtn)
   todoDiv.appendChild(deleteBtn)

   todoList.appendChild(todoDiv)
}      