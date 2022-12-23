let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let saveButtonEl = document.getElementById("saveButton");

function getTodofromLocalStorage() {
    let strigifieDtodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(strigifieDtodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodofromLocalStorage();
let TodoCount = todoList.length;

function ontodoStatusChange(checkboxId, labelId, todoId,labelContainerId) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    let labelContainerEl = document.getElementById(labelContainerId);
    
    labelContainerEl.classList.toggle("label-container-change");
    
    labelEl.classList.toggle("checked");
    let todoObjIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let selctedTodoObj = todoList[todoObjIndex];
    console.log(selctedTodoObj);
    if (selctedTodoObj.isChecked === true) {
        selctedTodoObj.isChecked = false;
    } else {
        selctedTodoObj.isChecked = true;
    }
}

function ondeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedItemIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let labelContainerId = "label"+todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
    
    let completedButtonEl = document.createElement("button");
    completedButtonEl.textContent = "completed";
    completedButtonEl.classList.add("complted-button");
    
    
    todoElement.appendChild(completedButtonEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    labelContainer.id = labelContainerId;
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    
    completedButtonEl.onclick = function() {
        ontodoStatusChange(checkboxId, labelId, todoId,labelContainerId);
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        ondeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

addTodoButtonEl.onclick = function() {
    let todoUserInputEl = document.getElementById("todoUserInput");
    let todoUserInputElVal = todoUserInputEl.value;
    TodoCount = TodoCount + 1;
    let newTodo = {
        text: todoUserInputElVal,
        uniqueNo: TodoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInputEl.value = "";
};

saveButtonEl.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};