const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

window.onload = function() {
    loadTasks();
};

addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

        if (taskText === "") {
        alert("Введите дело!");
        return;
    }

        const task = {
        id: Date.now(),
        text: taskText,
        done: false
    };

        addTaskToList(task);
    saveTaskToLocalStorage(task);

        taskInput.value = "";
});

function addTaskToList(task) {
    const taskItem = document.createElement("li");
    taskItem.id = task.id;

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskItem.appendChild(taskText);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Готово";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", () => toggleTaskDone(task.id));
    taskItem.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    taskItem.appendChild(deleteBtn);

    if (task.done) {
        taskText.style.textDecoration = "line-through";
    }

    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToList(task));
}

function toggleTaskDone(taskId) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.done = !task.done;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskList();
    }
}

function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = "";
    loadTasks();
}
