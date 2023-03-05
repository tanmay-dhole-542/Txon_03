// Define variables
const addForm = document.getElementById("add-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("list");
const allTasksBtn = document.getElementById("all-tasks-btn");
const completedTasksBtn = document.getElementById("completed-tasks-btn");
const activeTasksBtn = document.getElementById("active-tasks-btn");

let tasks = [];

// Add task
function addTask(task) {
    tasks.push(task);

    displayTasks();
}

// Edit task
function editTask(index, newTask) {
    tasks[index] = newTask;

    displayTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);

    displayTasks();
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const li = document.createElement("li");
        li.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            displayTasks();
        });

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.value = task.title;
        taskInput.addEventListener("input", () => {
            task.title = taskInput.value;

            displayTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => {
            const newTask = prompt("Enter new task:", task.title);

            if (newTask !== null) {
                editTask(i, {
                    title: newTask,
                    completed: task.completed,
                });
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteTask(i);
        });

        li.appendChild(checkbox);
        li.appendChild(taskInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    }
}

// Filter tasks
function filterTasks(filter) {
    let filteredTasks = [];

    if (filter === "all") {
        filteredTasks = tasks;
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    displayTasks(filteredTasks);
}

// Add task event listener
addForm.addEventListener("submit", e => {
    e.preventDefault();

    const title = taskInput.value.trim();

    if (title !== "") {
        addTask({
            title: title,
            completed: false,
        });

        taskInput.value = "";
    }
});

// Filter tasks event listeners
allTasksBtn.addEventListener("click", () => {
    allTasksBtn.classList.add("active");
    completedTasksBtn.classList.remove("active");
    activeTasksBtn.classList.remove("active");

    filterTasks("all");
});

completedTasksBtn.addEventListener("click", () => {
    allTasksBtn.classList.remove("active");
    completedTasksBtn.classList.add("active");
    activeTasksBtn.classList.remove("active");

    filterTasks("completed");
});

activeTasksBtn.addEventListener("click", () => {
    allTasksBtn.classList.remove("active");
    completedTasksBtn.classList.remove("active");
    activeTasksBtn.classList.add("active");

    filterTasks("completed");
});    
